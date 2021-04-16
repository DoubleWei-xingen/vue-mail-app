<template>
  <div class="slide-wrapper" ref="slidebar">
    <div
      v-for="(slide, index) in slideList"
      :key="slide"
      :class="{ active: activeIndex == index }"
      @touchend="scroll($event,index)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ index === 0 ? "全部" : slide }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import scrollMove from '@/utils/scrollMove';

export default {
  data() {
    return {
      move: false,
      activeIndex: 0,
    };
  },
  computed: {
    ...mapState({
      slideList: (state) => state.slideList,
    }),
  },
  methods: {
    ...mapMutations(['resetgoodList']),
    ...mapActions(['getgoodList']),
    async scroll(e, index) {
      if (this.move) {
        return;
      }
      const { slidebar } = this.$refs;
      const slitemTop = e.target.getBoundingClientRect().top;
      const slitemHeight = e.target.offsetHeight / 2;
      const slidepHeight = slidebar.offsetHeight / 2;
      const slidepTop = slidebar.getBoundingClientRect().top;

      const start = slidebar.scrollTop;
      const end = slitemTop - slidepHeight - slidepTop + slitemHeight;

      scrollMove(start, end, slidebar, 'scrollTop');
      await this.resetgoodList();
      this.getgoodList({
        type: this.slideList[index],
        page: 1,
        size: 5,
      });
      this.activeIndex = index;
    },
  },
  mounted() {
    this.resetgoodList();
  },
};
</script>

<style lang="less" scoped>
.slide-wrapper {
  position: fixed;
  width: 70px;
  top: 162px;
  left: 0;
  bottom: 50px;
  overflow: auto;
  font-size: 12px;
  background-color: rgb(240, 235, 235);
  div {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    text-align: center;
    border-bottom:1px solid #ff1a90;
    line-height: 42px;
    position: relative;
  }
  .active {
    color: #ff1a90;
    font-weight: bold;
  }
  .active::before {
    content: "";
    width: 6px;
    height: 18px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ff1a90;
  }
}

.slide-wrapper::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
