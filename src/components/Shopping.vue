<template>
  <div class="shoping-wrapper">
    <div class="shoping-head">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        right-text="删除"
        left-arrow
        @click-left="goback"
        @click-right="delet"
      />
    </div>
    <div class="goods-card" v-if="shopingList.length">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="good-list" v-for="item in shopingList" :key="item.id">
          <van-checkbox :name="item.id" class="checked"></van-checkbox>
          <list-card v-bind="item" :goodsnum="counterMap[item.id]"></list-card>
        </div>
      </van-checkbox-group>
    </div>
  <div class="card-none" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
    </div>
    <van-submit-bar
      :price="allMoney"
      :button-text="`去结算(${allNum})`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import getData from '@/api/Axiosget';
import { Dialog, Toast } from 'vant';
import ListCard from './ListCard.vue';

export default {
  components: { ListCard },
  data() {
    return {
      result: [],
      checked: false,
      shopingList: [],
      shoppingTotal: 0,
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    allMoney() {
      const resArr = this.shopingList.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + prev;
      }, 0);
    },
    allNum() {
      const resArr = this.shopingList.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => prev + this.counterMap[next.id], 0);
    },
  },
  created() {
    this.getdata();
  },
  methods: {
    ...mapMutations(['localStorageChange']),
    getdata() {
      const resultId = Object.keys(this.counterMap).join();
      getData.getGoodsByIds({ value: resultId }).then((res) => {
        this.shopingList = res.list;
        this.shoppingTotal = res.length;
      });
    },
    goback() {
      this.$router.push({
        name: 'Classify',
      });
    },
    async delet() {
      if (this.result.length === 0) {
        Toast('请选择你要移出购物车的商品');
        return;
      }
      try {
        await Dialog.confirm({ title: '移除商品', message: '你确定不要该宝贝了吗' });
        this.result.forEach((id) => {
          this.localStorageChange({ id, undefined });
          this.shopingList = this.shopingList.filter((item) => !this.result.includes(item.id));
          console.log(this.shopingList);
          this.result = [];
        });
      } catch (error) {
        Toast('嘿嘿，你还是留下了我');
      }
    },
    checkAll() {
      if (!this.$refs.checkboxGroup) {
        Toast('购物车没有任何有效商品');
        this.checked = false;
        return;
      }
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    onSubmit() {},
  },
  watch: {
    result() {
      if (this.result.length === this.shoppingTotal) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    counterMap() {
      const mapId = Object.keys(this.counterMap);
      console.log(mapId);
    },
  },
};
</script>

<style lang="less" socped>
.shoping-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .shoping-head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 47px;
    z-index: 10;
  }
  .goods-card {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    .good-list {
      display: flex;
      justify-content: center;
      .checked {
        margin-right: 5px;
        flex-shrink: 0;
      }
    }
  }
  .card-none{
      width: 100%;
      position: absolute;
      top: 48px;
      left: 0px;
      img{
          width: 100%;
      }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
.goods-card::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
