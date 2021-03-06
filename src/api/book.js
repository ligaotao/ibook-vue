import { BookState } from '@/state'

export const isInHistory = function (obj) {
    if (!obj) return false;

    let len = BookState.state.bookHistory.filter(function (k) {
        return k.bookSourceId == obj.bookSourceId && k.bookUrl == obj.bookUrl
    })
    return len.length != 0;
}

export const removeHistory = function (obj) {

    let bookHistory = BookState.state.bookHistory.filter(function (k) {
        return k.bookSourceId != obj.bookSourceId && k.bookUrl != obj.bookUrl
    })
    BookState.setState('bookHistory', bookHistory)
}

export const addHistory = function (obj) {
    let flag = isInHistory(obj)
    if (!flag) {
        const bookHistory = BookState.state.bookHistory
        bookHistory.push(obj)
        BookState.setState('bookHistory', bookHistory)
    }
    return [flag, obj]
}

/**
 * 用来将内存中的书籍信息 同步到历史数组中
 * @param {*} key 一般为 activeBook
 * @param {*} value 更新内容
 */

export const updateBookInfo = function (key, value) {
    
    BookState.setState(key, value)
    const obj = BookState.state[key]

    BookState.state.bookHistory.some(function(k, i) {
        if (k.bookSourceId == obj.bookSourceId && k.bookUrl == obj.bookUrl) {
            BookState.state.bookHistory[i] = obj
        }
        return k.bookSourceId == obj.bookSourceId && k.bookUrl == obj.bookUrl
    })
}
