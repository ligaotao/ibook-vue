import { reactive } from 'vue'
import routes from './routes'


const createState = () => {
    const state = reactive({
        activeBook: {
            chapter: [],
            bookName: '',
            bookSourceId: 22,
            bookUrl: '',
            activeChapterIndex: 0
        },
        bookHistory: []
    }
    )
    const setState = (key, value) => {
        if (Array.isArray(key)) {
            let obj = state
            key.forEach(k => {
                obj = obj[k]
            });
            obj = value
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


