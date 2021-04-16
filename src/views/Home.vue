<template>
  <div class="home">
      <router-view></router-view>
    <footerbar/>
  </div>
</template>

<script>
import footerbar from './footerBar.vue';

export default {
  components: {
    footerbar,
  },
};
</script>

<style lang="less" scoped>

</style>
