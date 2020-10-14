<template>
  <div class="book-box">
    <img :src="item.img" class="book-img" />
    <div class="book-detail">
      <h3>{{ item.name }}</h3>
      <div>{{ item.author }}</div>

      <div class="book-introduce">{{ item.introduce }}</div>
      <div class="book-last-chapter">最新章节：{{ item.lastCapter }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          img: "",
          name: "",
          author: "",
          introduce: "",
          lastCapter: "",
        };
      },
    },
  },
};
</script>

<style>
.book-box {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
  height: 200px;
}
.book-box .book-img {
  width: 150px;
}
.book-box .book-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 10px;
  font-size: 12px;
  overflow: hidden;
  height: 100%;
}
.book-detail h3 {
  padding: 0;
  margin: 10px 0;
  font-size: 16px;
}
.book-detail .book-last-chapter {
  height: 30px;
  overflow: hidden;
}
.book-introduce {
    flex: 1;
    color: #666;
    font-size: 12px;
    overflow: hidden;
    padding-bottom: 10px;
}
</style>