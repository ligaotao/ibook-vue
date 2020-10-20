
import { ref, computed } from "vue";
import { Dialog, Notify } from "vant";
import { addHistory, isInHistory, removeHistory } from "@/api/book";

export function bookHistory() {
    const activeBook = ref(null);
    let isLike = computed(() => {
        return isInHistory(activeBook.value)
    });

    const pushHistory = function () {
        if (isLike.value) {
            Dialog.confirm({
                title: "标题",
                message: "是否要取消收藏该书籍",
            })
                .then(() => {
                    removeHistory(activeBook.value);
                    Notify({ type: 'primary', message: '删除成功' });
                })
        } else {
            addHistory(activeBook.value);
            Notify({ type: 'primary', message: '加入收藏' });
        }

    };
    return {
        isLike,
        activeBook,
        pushHistory
    }

}