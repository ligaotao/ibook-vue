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
