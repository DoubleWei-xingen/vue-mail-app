<template>
  <div class="item" v-if="exsit"
  :style="{
      width:`${width}px`,
      height:`${height}px`,
      transform: `translate(${moveX}px, ${moveY}px) scale(${sx} ,${sy})`
  }">
      <img :src="src" >
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="less">
.item{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    transition: all 2s;
    transform-origin: 5% 5%;
    img{
       width: 100%;
       height: 100%;
       border-radius: 50%;
    }
}

</style>
