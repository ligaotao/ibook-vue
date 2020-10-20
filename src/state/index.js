import { reactive } from 'vue'
import routes from './routes'
import {isObject} from '@/util'

const createState = () => {
    const state = reactive({
        activeBook: {
            name: "",
            img: "",
            author: "",
            introduce: "",
            chapter: [],
            activeChapterIndex: 0,
            bookSourceId: 22,
            bookUrl: "",
            bookName: ""
        },
        bookHistory: []
    }
    )
    const setState = (key, value) => {
        if (isObject(value)) {
            for (var k in value) {
                state[key][k] = value[k]
            }
        } else {
            state[key] = value
        }
        window.localStorage.setItem('bookState', JSON.stringify(state))
    };

    return { setState, state: state };
}

export const BookState = createState()
export const Routes = routes

// 初始化从本地读取
let bookInit = JSON.parse(window.localStorage.getItem('bookState'))

if (bookInit) {
    for (let key in bookInit) {
        BookState.setState(key, bookInit[key])
    }
}


