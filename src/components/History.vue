<template>
  <div class="history">
    <div class="history-title">
      <h1>历史搜索：</h1>
      <div @click="remove">
        <van-icon name="delete-o" class="delete" />
      </div>
    </div>
    <div class="history-list">
      <div
        class="history-item"
        v-for="item in searchList"
        :key="item.time"
        @click="onSearch(item.value)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    onSearch(value) {
      this.$emit('search', value);
    },
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style lang="less" scoped>
.history-title {
  display: flex;
  padding: 4px 8px;
  justify-content: space-between;
  h1 {
    font-size: 14px;
  }
  .delete {
    font-size: 20px;
  }
}
.history-list {
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  .history-item {
    padding: 4px 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    background: rgb(250, 220, 220);
    border-radius: 5px;
  }
}
</style>
