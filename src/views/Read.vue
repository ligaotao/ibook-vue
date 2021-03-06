<template>
  <div class="read-box">
    <Popup v-model:show="show" position="left" class="read-book-left" duration='0.1'>
      <div class="catalog-meta">
        <h3>目录</h3>
        <span class="order" @click="changeOrder">{{ changeOrderWord }}</span>
      </div>
      <VirtualList
        style="overflow-y: auto"
        data-key="name"
        :data-sources="chapter"
        :data-component="Item"
        :extra-props="{ active: activeOrderChapterIndex }"
        class="read-info-chapter"
        @abc="goToChapter"
      />
    </Popup>
    <div class="read-content" @click="actionShow = !actionShow">
      <List
        v-model:loading="loading"
        @load="loadMore"
        :offset="100"
        :immediate-check="false"
        loading-text="加载中..."
        class="read-content-box"
      >
        <Cell
          :key="item"
          :title="item"
          v-for="item in contents"
          :style="{ fontSize: fontSize + 'px' }"
          :class="lineHeight"
        >
          <template #title>
            <div v-html="item"></div>
          </template>
        </Cell>
      </List>
    </div>
    <div class="read-action" v-show="actionShow">

      <Tabs
        v-model:active="active"
        class="tab-reseve"
        @click="actionTab"
        color="#000"
        title-active-color="#000"
      >
        <div class="read-process-box">
          <div>上一篇</div>
          <div class="read-process">
            <Slider v-model="fontSize" active-color="#999" :min="10" :max="26">
              <template #button>
                <div class="custom-button"></div>
              </template>
            </Slider>
          </div>
          <div>下一篇</div>
        </div>
        <Tab title="目录" name="a">
          <div class="read-bottom-action"></div>
          <template #title>
            <Icon class-prefix="icon" name="mulu" size="20" />
          </template>
        </Tab>
        <Tab title="收藏" name="d">
          <div class="read-bottom-action"></div>
          <template #title>
            <Icon
              name="like-o"
              size="20"
              @click="pushHistory"
              :class="isLike ? 'active-icon' : ''"
            />
          </template>
        </Tab>
        <Tab title="字体" name="b">
          <template #title
            ><Icon class-prefix="icon" name="ziti" size="24" />
          </template>
        </Tab>
        <Tab title="进度" name="c">
          <div class="read-bottom-action"></div>
          <template #title>
            <Icon class-prefix="icon" name="xiaoshuo" size="24" />
          </template>
        </Tab>
      </Tabs>
      <div class="font-change-model" v-show="fontShow">
        <div class="read-bottom-action">
            <span class="read-bottom-action-name">字号</span>
            <span class="read-font-small">A-</span>
            <Slider
              v-model="fontSize"
              active-color="#ee0a24"
              class="font-process"
              :min="10"
              :max="26"
            >
              <template #button>
                <div class="custom-button">{{ fontSize }}</div>
              </template>
            </Slider>
            <span class="read-font-big">A+</span>
          </div>
          <div class="read-bottom-action">
            <span class="read-bottom-action-name">行高</span>
            <ul class="line-height-list">
              <li v-for="item in lineHeightList" :key="item" @click="lineHeight=item">
                <Icon class-prefix="icon" :name="item" size="20" :class="item==lineHeight? 'active-icon': ''" />
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { BookState } from "@/state";
import { Popup, List, Cell, Tabs, Tab, Slider, Icon, Dialog, Notify } from "vant";
import VirtualList from "@/components/vue-virtual-scroll-list/index";
import Item from "@/components/Item";
import { chapterInfo } from "@/api";
import { addHistory, isInHistory, removeHistory, updateBookInfo } from "@/api/book";

export default {
  name: 'ReadBook',
  components: {
    Popup,
    List,
    Cell,
    Tab,
    Tabs,
    VirtualList,
    Slider,
    Icon,
  },
  setup() {
    const chapter = ref([]);
    let show = ref(false);
    let index = ref(0);
    let loading = ref(false);
    let contents = ref([]);
    let order = ref(true);
    let fontSize = ref(14);
    let fontShow = ref(false);
    let lineHeight = ref("lineheightl")
    let active = ref("c");
    let actionShow = ref(false);
    let activeChapterIndex = ref(0);
    let lineHeightList = [
      'lineheightm', 'lineheightl', 'lineheightx'
    ]
    // 初始化书籍信息
    const activeBook = JSON.parse(JSON.stringify(BookState.state.activeBook));
    let isLike = ref(isInHistory(activeBook));

    chapter.value = activeBook.chapter;
    index.value = activeBook.activeChapterIndex;

    activeChapterIndex.value = activeBook.activeChapterIndex;

    const activeOrderChapterIndex = computed(() => {
      // 倒序后调整 激活的索引值
      let index = !order.value
        ? chapter.value.length - 1 - activeChapterIndex.value
        : activeChapterIndex.value;
      return index;
    });

    const nextChapter = function () {
      let next = 0
      if (order.value) {
        next = activeChapterIndex.value - 1
      } else {
        next = activeChapterIndex.value + 1
      }
      return next
    }

    const load = async function () {
      
      let url = chapter.value[activeOrderChapterIndex.value].url;

      let result = await chapterInfo({ chapter_url: url, book_source_id: 22 });
      
      console.log(activeChapterIndex.value)

      updateBookInfo("activeBook", {activeChapterIndex: activeChapterIndex.value})

      contents.value.push(result.data.result);

      loading.value = false;
    };
    // 初始化的时候 调用请求章节
    load();
    
    const changeOrder = function () {
      order.value = !order.value;
      chapter.value.reverse();
    };
    const catalogLen = computed(() => chapter.value.length);
    const changeOrderWord = computed(() => {
      // 倒序后调整 激活的索引值
      return order.value ? "正序" : "倒序";
    });

    const actionTab = function (active) {
      if (active == "a") {
        show.value = true;
        actionShow.value = false;
      } else if (active == 'b') {
        fontShow.value = true;
      }
    };
    const goToChapter = function (i) {
      contents.value = [];
      activeChapterIndex.value = order.value ? chapter.value.length - 1 - i  : i;

      load();

      show.value = false;
    };
    const loadMore = function () {
      let page = nextChapter()
      activeChapterIndex.value = page;
      load()
    }
    const pushHistory = function () {
      if (isLike.value) {
        Dialog.confirm({
          title: "标题",
          message: "是否要取消收藏该书籍",
        })
          .then(() => {
            removeHistory(activeBook);
            isLike.value = false;
            Notify({ type: 'primary', message: '删除成功' });
          })
      } else {
        addHistory(activeBook);
        isLike.value = true;
        Notify({ type: 'primary', message: '加入收藏' });
      }

    };
    const changeLineHeight = function (value) {
      lineHeight.value = value
    }

    watch(actionShow, (actionShow) => {
      if (actionShow == false) {
        fontShow.value = false
      }
    })
    return {
      chapter,
      show,
      index,
      loading,
      contents,
      loadMore,
      Item,
      changeOrder,
      catalogLen,
      changeOrderWord,
      fontSize,
      active,
      actionShow,
      actionTab,
      goToChapter,
      pushHistory,
      activeOrderChapterIndex,
      isLike,
      lineHeight,
      lineHeightList,
      changeLineHeight,
      fontShow
    };
  },
};
</script>

<style lang="less">
.read-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(245, 245, 245);
}
.read-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eaeaea;
  padding-top: 10px;
}
.read-chapter {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: column;
  display: flex;
  width: 200px;
  font-size: 12px;
  background: #ccc;
}
.read-book-left {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.read-book-left h3 {
  text-align: center;
  flex: 1;
}
.read-info-chapter {
  flex: 1;
}
.read-content {
  height: 100%;
}
.read-content-box {
  text-align: left;
  height: 100%;
  overflow-y: auto;
}
.catalog-meta {
  display: flex;
  padding: 0 10px 0 25px;
  font-size: 12px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.catalog-meta span {
  text-align: left;
  color: #eaeaea;
}
.catalog-meta .order {
  text-align: right;
}
.tab-reseve {
  display: flex;
  flex-direction: column-reverse;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: @title-color-active;
  border-radius: 100px;
}
.read-process-box {
  display: flex;
  align-items: center;
}
.read-process-box > div {
  width: 80px;
  font-size: 10px;
}
.read-process-box .read-process {
  flex: 1;
}
.read-action .van-tabs__line {
  display: none;
}
.read-bottom-action {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.read-bottom-action .read-font-small,
.read-bottom-action .read-font-big {
  padding: 0 10px;
}
.font-process {
  flex: 1;
}
.active-icon {
  color: @title-color-active;
}
.read-bottom-action-name {
  width: 40px;
  text-align: left;
  font-size: 12px;
}
.font-change-model {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  height: 100px;
}
.line-height-list {
  display: flex;
  flex: 1;
}
.line-height-list li {
  flex: 1;
}
.lineheightm {
  line-height: 20px;
}
.lineheightl{
  line-height: 24px;
}
.lineheightx {
  line-height: 30px;
}
</style>