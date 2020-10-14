<template>
  <div class="about">
    <ul class="book-shelf">
      <li v-for="(book, index) in history" :key="index" @click="goToBook(book.bookUrl)">
        <bookBox :item="book" ></bookBox>
      </li>
    </ul>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {BookState} from '@/state';
import bookBox from '@/components/bookBox'
export default {
  components: {
    bookBox
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
</style>