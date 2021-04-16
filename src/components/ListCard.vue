<template>
  <div class="list-card van-hairline--bottom">
    <div class="list-image">
      <img :src="images[0]" alt="" ref="img" />
    </div>
    <div class="list-content">
      <div class="title overeflow-hidden">{{title}}</div>
      <div class="desc overeflow-hidden">{{desc}}</div>
      <div class="tags">
        <div v-for="tag in tags" :key="tag" class="overeflow-hidden">{{tag}}</div>
      </div>
      <div class="price">¥{{price}}</div>
      <div class="countwraper">
        <div @click="counter(id,-1)" v-if="goodsnum">
         <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div class="goodnum" v-if="goodsnum">{{goodsnum}}</div>
        <div @click="counter(id,1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tool/animate';

export default {
  props: ['images', 'title', 'desc', 'tags', 'price', 'goodsnum', 'id'],
  methods: {
    ...mapMutations(['localStorageChange']),
    counter(id, value) {
      this.localStorageChange({ id, value });
      if (value === -1) {
        return;
      }
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
      const carDom = document.getElementById('shopping-car');
      const { top: carY, left: carX } = carDom.getBoundingClientRect();
      const { offsetWidth: carWidht, offsetHeight: carHeight } = carDom;
      const startY = top;
      const startX = left;
      const endY = carY + carHeight / 2;
      const endX = carX + carWidht / 2;
      Animate({
        startY,
        startX,
        endY,
        endX,
        width: imgHeight,
        height: imgWidth,
        src: this.$refs.img.src,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.list-card {
  width: 100%;
  height: 100px;
  display: flex;
  .list-image {
    width: 90px;
    height: 90px;
    margin-right: 20px;
    img{
        width: 100%;
        height: 100%;
    }
  }
  .list-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      padding-top: 5px;
      font-size: 13px;
      color: black;
      font-weight: bold;
    }
    .desc {
      font-size: 11px;
      color: #cecece;
      padding-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
        >div {
        font-size: 10px;
        padding: 2px;
        margin-right: 5px;
        border-radius: 4px;
        color: #cecece;
        border: 1px solid #aaa;
      }
    }
    .price {
      font-size: 14px;
      padding-top: 4px;
      color: #ff1a90;
      font-weight: bold;
    }
    .countwraper{
      position: absolute;
      display: flex;
      right:0px ;
      bottom: 13px;
      justify-content: flex-end;
      align-items: center;
       >div:not(.goodnum){
        width: 16px;
        height: 16px;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .goodnum{
        color: #ff1a90;
        font-size: 14px;
        font-weight: bold;
        padding: 0 5px;
      }
    }
  }
}
.overeflow-hidden{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
