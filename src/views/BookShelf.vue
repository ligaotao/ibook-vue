<template>
  <div class="about">
    <ul class="book-shelf" v-if="history.length">
      <li v-for="(book, index) in history" :key="index" @click="goToBook(book.bookUrl)">
        <bookBox :item="book" ></bookBox>
      </li>
    </ul>
    <div class="book-empty" v-else>
       <Icon class-prefix="icon" name="kong" size="64" />
      <div class="book-empty-meta">去添加几本书 再来看吧</div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {BookState} from '@/state';
import {Icon} from 'vant';
import bookBox from '@/components/bookBox'
export default {
  components: {
    bookBox, Icon
  },
  setup () {
    const history = BookState.state.bookHistory;
    const router = useRouter();
    const goToBook = function (url) {
      router.push({
        name: 'BookInfo',
        query: {
          book_source_id: 11,
          url
        }
      })
    }
    return {
      history,
      goToBook
    }
  }
}
</script>

<style>
.book-shelf {
  list-style: none;
  padding: 0 10px;
  margin: 0;
}
.book-empty {
  width: 100%;
  text-align: center;
  padding: 40px 0;
  position: fixed;
  top:50%;
  color: #999;
  transform: translateY(-50%);
}
.book-empty-meta {
  font-size: 14px;
  padding: 10px 0;
}
</style>