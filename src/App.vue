<template>
  <div id="app">
    <transition :name="transitionName" :mode="mode ? 'out-in' :'in-out'">
       <router-view class="view" ></router-view>
    </transition>
  </div>
</template>
<script>

export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setcounterMap', counterMap);
  },
  data() {
    return {
      transitionName: 'slide-left',
      mode: true,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Search' && from.name === 'Classify') {
        this.mode = true;
      } else if (to.name === 'Search' && from.name === 'Classify') {
        this.mode = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
#app{
  width: 100%;
  height: 100vh;
}
 .view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  transition: all .2s linear;
}
.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
