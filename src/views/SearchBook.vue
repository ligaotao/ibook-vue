<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { List, Cell, Search, Notify } from "vant";
import bookBox from "@/components/bookBox";
import { search } from "@/api";


export default {
  setup() {
    const router = useRouter();
    const bookList = ref([]);
    let loading = ref(false);
    let error = ref(false);
    let searchMain = ref('')


    const getSearchBook = async function () {
      let params = {
        book_source_id: 22,
        search_key: searchMain.value
      }
      if (searchMain.value.length < 2) {
        Notify({ type: 'danger', message: '搜索字节最少为两个' })
      }

      loading.value = true
      let result = await search(params);
      bookList.value = bookList.value.concat(result.data.result) ;
      loading.value = false
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
    const slots = {
      action: () => (
        <div onClick={getSearchBook}>搜索</div>
      )
    }
    return () => (
      <div>
        <Search v-model={[searchMain.value, ["value"]]}
          show-action
          placeholder="请输入搜索关键词"
          v-slots={slots}
        ></Search>
        <List
          v-model={[loading.value, "loading"]}
          v-model={[error.value, "error"]}
          error-text="请求失败，点击重新加载"
          class="book-list"
          finished={true}
        >
          {bookList.value.map((item) => {
            const slots = {
              title: () => (
                <bookBox item={item}></bookBox>
              ),
            };
            return (
              <Cell key={item.name} title={item.name} v-slots={slots} onClick={() => goToBook(item.url)}></Cell>
            );
          })}
        </List>
      </div>
    );
  },
};
</script>

<style lang="less">
.list {
  position: relative;
  padding-top: 40px;
}
.title {
  font-size: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  line-height: 40px;
  background: @title-color-active;
  color: #fff;
}
.book-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
</style>