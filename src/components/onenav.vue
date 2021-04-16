<template>
    <div class="one-nav" ref="scroll">
      <div
        class="items"
        v-for="(item, i) in menuList"
        :key="item.title"
        :class="{ active: activeIndex == i }"
        @touchend="scroll($event, i)"
        @touchstart="move = false"
        @touchmove="move = true"
      >
        <div class="img-wrapper">
          <img :src="item.imgURL" />
        </div>
        <div class="item-desc">{{ item.title }}</div>
      </div>

  </div>
</template>

<script>
import scrollMove from '@/utils/scrollMove';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      move: false,
      activeIndex: 0,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapMutations(['resetgoodList']),
    scroll(e, i) {
      if (this.move) {
        return;
      }
      const itemsLeft = e.target.getBoundingClientRect().left;
      const itemwidht = e.target.offsetWidth / 2;
      const wrapeperwidth = this.$refs.scroll.clientWidth / 2;
      const start = this.$refs.scroll.scrollLeft;
      const end = itemsLeft - wrapeperwidth + itemwidht;
      scrollMove(start, end, this.$refs.scroll, 'scrollLeft');
      this.resetgoodList();
      this.$store.dispatch('getSlideList', this.menuList[i].title);
      this.activeIndex = i;
    },
  },
  created() {
    this.resetgoodList();
    this.$store.dispatch('getSlideList', this.menuList[0].title);
  },
};
</script>

<style lang="less" scoped>
.one-nav {
  width: 100%;
  height: 104px;
  display: flex;
  align-items: center;
  overflow: auto;
  .items {
    width: 60px;
    height: 70px;
    margin: 10px 5px 0px;
    text-align: center;
    .img-wrapper {
      width: 45px;
      height: 45px;
      box-sizing: border-box;
      border-radius: 46px;
      line-height: 45px;
      > img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .item-desc {
      width: 50px;
      font-size: 12px;
      font-weight: bold;
      margin-top: 5px;
    }
  }
  .active {
    .img-wrapper {
      border: 2px solid #d13193;
    }
    .item-desc {
      color: #d13193;
    }
  }
}
.one-nav::-webkit-scrollbar {
  width: 0px;
  background-color: none;
}
</style>
