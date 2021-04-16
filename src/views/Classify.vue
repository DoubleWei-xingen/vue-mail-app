<template>
  <div class="wrapper">
    <router-link tag="div" to="/search" class="searchbox">
      <van-icon name="search" />
      <div>苹果一元一斤</div>
    </router-link>
    <one-nav></one-nav>
    <template v-if="showContent">
      <slide-bar></slide-bar>
      <good-list></good-list>
    </template>
    <van-loading size="zrem" vertical v-else>Loading...</van-loading>
  </div>
</template>

<script>
import OneNav from '@/components/onenav.vue';
import { mapState } from 'vuex';
import SlideBar from '../components/SlideBar.vue';
import GoodList from '../components/GoodList.vue';

export default {
  components: { OneNav, SlideBar, GoodList },
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
    }),
  },
};
</script>

<style lang="less" scoped>
.wrapper {
   width: 100%;
  .searchbox {
    width: 355px;
    height: 33px;
    margin: 11px auto;
    background-color: #eee;
    font-size: 14px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>>
