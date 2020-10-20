<template>
  <div class="book-info">
      <NavBar
        :title="state.name"
        left-arrow
        @click-left="router.go(-1)"
        :fixed="true"
        :placeholder="true"
      />
    <div class="book-info-img">
      <Image :src="state.img" width="190" height="270" />
    </div>

    <Tabs v-model:active="state.active" class="book-info-content">
      <Tab title="简介" class="book-chapter-introduce">{{ state.introduce }}</Tab>
      <Tab title="章节目录" class="book-chapter-box">
        <VirtualList
          style="height: 100%; overflow-y: auto"
          data-key="name"
          :data-sources="state.chapter"
          :data-component="Item"
          class="book-info-chapter"
        />
      </Tab>
    </Tabs>
    <div class="book-action">
      <Button color="#ee0a24" plain class="book-action-button" @click="pushHistory">{{isLike ? '取消' : '加入'}}收藏</Button>
      <Button color="#ee0a24" class="book-action-button" @click="readBook">开始阅读</Button
      >
    </div>
  </div>
</template>  

<script>
import { reactive, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BookState } from "@/state";
import { Tab, Tabs, Image, Button, NavBar } from "vant";
import { bookInfo } from "@/api";
import VirtualList from "@/components/vue-virtual-scroll-list/index";
import {Routes} from '@/state'
import Item from "@/components/Item";

import {bookHistory} from "@/composition/book";

export default {
  components: {
    Tab,
    Tabs,
    Image,
    Button,
    VirtualList,
    NavBar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const {isLike, activeBook, pushHistory} = bookHistory();

    const state = reactive({
      name: "",
      img: "",
      author: "",
      introduce: "",
      chapter: [],
      activeChapterIndex: 0,
      bookSourceId: 22,
      bookUrl: "",
      bookName: ""
    });

    const getBookInfo = async function () {
      let params = {
        book_source_id: 22,
        book_url: route.query.url,
      };
      let result = await bookInfo(params);
      state.name = result.data.result.bookName;
      state.img = result.data.result.img;
      state.author = result.data.result.author;
      state.chapter = result.data.result.chapter;
      state.introduce = result.data.result.introduce;
      state.bookUrl = route.query.url
      activeBook.value = state
    };

    const readBook = function () {
      BookState.setState("activeBook", state);
      router.push({ name: "ReadBook" });
    };
    const init = function () {
      state.img = ''
      state.name = ''
      state.author = ''
      state.introduce = ''
      state.chapter = []
      return getBookInfo()
    }

    onActivated(() => {
      const fullPath = route.fullPath
      if (Routes.state.bookInfoUrl != fullPath) {
        init()
      }
      Routes.setState('bookInfoUrl', fullPath)
    })
    return {
      getBookInfo,
      state,
      readBook,
      Item,
      init,
      isLike,
      pushHistory,
      router
    };
  },
};
</script>

<style lang="less">
.book-info {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.book-info-content {
  display: flex;
  flex-direction: column;
}

.book-info-content .van-tabs__content {
  overflow: hidden;
  flex: 1;
}
.book-chapter-box {
  height: 100%;
  overflow: hidden;
  font-size: 14px;
}
.book-info-content,
.book-info-chapter {
  flex: 1;
  overflow: hidden;
}
.book-info-img {
  border-bottom: 1px solid #ccc;
}
.book-action {
  display: flex;
}
.book-action .book-action-button {
  flex: 1;
}
.book-chapter-introduce {
  padding: 20px;
  text-align: left;
  line-height: 24px;
  font-size: 14px;
}
</style>