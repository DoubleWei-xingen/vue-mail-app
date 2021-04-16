<template>
  <div class="good-wrapper">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: sorttype === 'all' }" @click="changeActive('all')">
        综合
      </div>
      <div
        :class="{ active: sorttype === 'sale' }"
        @click="changeActive('sale')"
      >
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': sorttype === 'price-up',
          'price-down': sorttype === 'price-down',
        }"
        @click="changeActive('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="isfirst"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <list-card
            v-for="item in goodList"
            :key="item.id"
            v-bind="item"
            :goodsnum="counterMap[item.id]"
          ></list-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ListCard from './ListCard.vue';

export default {
  components: { ListCard },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
      size: 5,
      sorttype: 'all',
      isfirst: false,
    };
  },
  computed: {
    ...mapState({
      goodList: (state) => state.goodList,
      slideList: (state) => state.slideList,
      goodsType: (state) => state.goodsType,
      goodstotal: (state) => state.goodstotal,
      sortType: (state) => state.sortType,
      counterMap: (state) => state.counterMap,
    }),
  },
  methods: {
    ...mapMutations(['resetgoodList', 'sortGoodsList']),
    ...mapActions(['getgoodList']),
    async changeActive(type) {
      if (type === 'all') {
        this.sorttype = 'all';
      } else if (type === 'sale') {
        this.sorttype = 'sale';
      } else if (type === 'price') {
        if (this.sorttype === 'price-up') {
          this.sorttype = 'price-down';
        } else {
          this.sorttype = 'price-up';
        }
      }
      this.isfirst = false;
      this.sortGoodsList(this.sorttype);
      this.resetgoodList();
      this.page = 1;
      await this.getgoodList({
        type: this.goodsType,
        page: this.page,
        size: this.size,
      });
      this.finished = false;
      this.loading = false;
      this.isLoading = false;
    },
    onRefresh() {
      this.page = 0;
      this.finished = false;
      this.loading = true;
      this.resetgoodList();
      this.onLoad();
      this.isLoading = false;
    },
    async onLoad() {
      if (this.finished) {
        return;
      }
      this.page += 1;
      await this.getgoodList({
        type: this.goodsType,
        page: this.page,
        size: this.size,
      }).then(() => {
        if (this.goodList.length < this.goodstotal) {
          this.loading = false;
        } else {
          this.finished = true;
        }
      });
    },
  },
  watch: {
    goodsType() {
      this.page = 0;
      this.finished = false;
      this.isLoading = false;
      this.isfirst = false;
    },
  },
};
</script>

<style lang="less" scoped>
.good-wrapper {
  position: fixed;
  right: 0;
  top: 163px;
  width: 303px;
  .list-header {
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: flex-end;
    padding: 0 8px;
    > div {
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #cecece;
      position: relative;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price::before {
      content: "";
      position: absolute;
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      top: 3px;
      right: 3px;
    }
    .price::after {
      content: "";
      position: absolute;
      border: 4px solid transparent;
      border-top-color: #aaa;
      bottom: 1px;
      right: 3px;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
  }
  .list-content {
    position: fixed;
    overflow: auto;
    bottom: 50px;
    top: 190px;
  }
  .list-content::-webkit-scrollbar {
    width: 0;
    background: none;
  }
  .van-pull-refresh {
    overflow: unset !important;
  }
}
</style>
