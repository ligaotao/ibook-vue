import { _axios } from '../plugins/axios'

export function bookSource() {
    return _axios.get('https://lzyd.51kk.net/')
}

export async function bookClassify() {
    return _axios.get('/api/v1/books/classify', {params: {
        book_source_id: 11
    }})
}

export async function bookClassifyList(params) {
    return _axios.get('/api/v1/books/classify/list', {params})
}

export async function bookInfo(params) {
    return _axios.get('/api/v1/books/info', {params})
}

export async function chapterInfo(params) {
    return _axios.get('/api/v1/books/content', {params})
}

export async function search(params) {
    return _axios.get('/api/v1/books/search', {params})
}