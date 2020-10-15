<template>
<div class="list">
      <NavBar
        :title="route.query.classfiy_name"
        left-arrow
        @click-left="router.go(-1)"
        :fixed="true"
        :placeholder="true"
      />
        
        <List
          v-model:loading="loading"
          v-model:error="error"
          error-text="请求失败，点击重新加载"
          class="book-list"
          @load="getMore"
          offset="100"
        >
            <Cell :key="item.name" :title="item.name" @click="goToBook(item.url)" v-for="item in bookList">
              <template #title>
                <bookBox :item="item" />
              </template>  
            </Cell>
        </List>
      </div>  
</template>

<script>
import { ref, onMounted, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { List, Cell, NavBar } from "vant";
import { bookClassifyList } from "@/api";
import {Routes} from '@/state'
import bookBox from '@/components/bookBox';

export default {
  // beforeRouteEnter (to, from, next) {
  //   if (Routes.state.classifyUrl == to.fullpath) {
  //       next()
  //   } else {
  //      next(vm => {
  //        vm.init()
  //      })
  //   }
  //   Routes.setState('classifyUrl', to.fullpath)
   
  // },
  
  components: {
    List,
    Cell,
    NavBar,
    bookBox
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const page = ref(1);
    const bookList = ref([]);
    let loading = ref(false);
    let error = ref(false);

    const getbookClassifyList = async function () {
      let params = {
          book_source_id: 11, classify_url: route.query.url, page: page.value
      }
      let result = await bookClassifyList(params);
      bookList.value = bookList.value.concat(result.data.result) ;
      page.value = params.page
      loading.value = false
    };
    const getMore = function () {
        page.value = page.value + 1
        loading.value = true
        return getbookClassifyList()
    }
    const init = function () {
      page.value = 0
      return getMore()
    }
    const goToBook = function (url) {
      router.push({
        name: 'BookInfo',
        query: {
          book_source_id: 11,
          url
        }
      })
    }

    onMounted(
      getMore
    );
    onActivated(() => {
      if (Routes.state.classifyUrl != route.fullpath) {
        init()
        Routes.setState('classifyUrl', route.fullpath)
      }
      
    })
    return {
      bookList,
      loading,
      error,
      goToBook,
      route,
      router,
      init,
      getMore
    }
  },
};
</script>

<style lang="less">
.list {
  position: relative;
}
.book-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
</style>