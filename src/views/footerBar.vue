<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" name="home" to="/">首页</van-tabbar-item>
    <van-tabbar-item
      icon="apps-o"
      name="search"
      to="/home/classify"
      >分类</van-tabbar-item
    >
    <van-tabbar-item
      icon="cart-o"
      name="friends"
      to="/home/shopping"
      :badge="badge"
      id="shopping-car"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="user-circle-o" name="settings" to="/other"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      active: 'home',
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const counts = Object.values(this.counterMap).reduce(
        (perv, next) => perv + next,
        0,
      );
      if (counts >= 99) {
        return '99+';
      }
      return counts;
    },
  },
};
</script>

<style>
</style>
