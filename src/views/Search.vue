<template>
  <div class="search-wrapper">
    <div class="search-head">
    <router-link to="/home/classify">
         <van-icon name="arrow-left" class="arrow-left" />
    </router-link>
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showList">
          <div @click="onSearch(value)" class="search">搜索</div>
        </template>
        <template #action v-else>
          <router-link
            tag="div"
            class="shopping-car"
            id="shopping-car"
            to="/home/shopping"
          >
            <van-icon name="shopping-cart-o" :badge="badge" />
          </router-link>
        </template>
      </van-search>
    </div>
    <div class="like-content" v-if="likeList.length && showList">
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item"
          :title="item"
          @click="onSearch(item)"
        >
          <template #title>
            <span class="hootword" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-card" v-else-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
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
    </div>
    <div class="history-wraper" v-if="showList && likeList.length <=0">
        <history :searchList="searchList" @search="onSearch" @remove="removehistory"></history>
    </div>
  </div>
</template>
<script>
import getData from '@/api/Axiosget';
import ListCard from '@/components/ListCard.vue';
import { mapState } from 'vuex';
import History from '../components/History.vue';

export default {
  components: {
    ListCard,
    History,
  },
  data() {
    return {
      value: '',
      place: '酒',
      likeList: [],
      timer: null,
      goodList: [],
      loading: false,
      finished: false,
      showList: true,
      searchList: [],
      page: 1,
      size: 7,
      total: 0,
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
  methods: {
    onSearch(searchValue) {
      if (searchValue) {
        this.value = searchValue;
      } else {
        this.value = this.place;
      }
      this.likeList = [];
      this.goodList = [];
      const historyValue = this.searchList.find((item) => item.value === this.value);
      if (historyValue) {
        historyValue.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
      }
      localStorage.setItem('history', JSON.stringify(this.searchList));
      this.finished = false;
      this.page = 1;
      getData
        .serch({
          type: this.value,
          page: this.page,
          size: this.size,
        })
        .then((res) => {
          this.goodList = [...this.goodList, ...res.list];
          this.total = res.total;
          this.showList = false;
        });
    },
    input() {
      if (this.value === '') {
        this.likeList = [];
        clearTimeout(this.timer);
        this.timer = null;
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(() => {
          getData.likeSerch({ likeValue: this.value }).then((res) => {
            this.likeList = res.result;
            clearTimeout(this.timer);
            this.timer = null;
          });
        }, 600);
      }
    },
    formatHTML(value) {
      const reg = new RegExp(this.value, 'g');
      return value.replace(reg, this.value.fontcolor('#f40'));
    },
    focus() {
      this.showList = true;
    },
    onLoad() {
      if (this.finished) {
        return;
      }
      this.page += 1;
      getData
        .serch({
          type: this.value,
          page: this.page,
          size: this.size,
        })
        .then((res) => {
          this.goodList = [...this.goodList, ...res.list];
          this.loading = false;
        });
      if (this.goodList.length >= this.total) {
        this.finished = true;
        this.loading = true;
      }
    },
    removehistory() {
      localStorage.removeItem('history');
      this.searchList = [];
    },
  },
  created() {
    const value = JSON.parse(localStorage.getItem('history'));
    this.searchList = value;
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .search-head {
    position: fixed;
    z-index: 100;
    width: 345px;
    left: 15px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .search-content {
      flex: 1;
      .search {
        padding: 0px 6px;
        color: #fff;
        font-size: 8px;
        border-radius: 8px;
        font-weight: bold;
        background-image: linear-gradient(
          to bottom,
          rgb(245, 83, 8) 0%,
          rgb(240, 67, 24) 30%,
          rgb(236, 20, 5) 70%
        );
      }
      .shopping-car {
        font-size: 24px;
      }
    }
    .arrow-left {
      font-size: 20px;
      font-weight: bold;
      color: aqua;
    }
  }
  .like-content {
    position: relative;
    z-index: 10;
    top: 60px;
    left: 30px;
    box-sizing: border-box;
  }
  .goods-card {
    position: relative;
    width: 345px;
    z-index: 10;
    top: 54px;
    left: 15px;
    background: #fff;
  }
  .history-wraper {
    position: absolute;
    z-index: 1;
    width: 345px;
    top: 54px;
    left: 25px;
  }
}
</style>
