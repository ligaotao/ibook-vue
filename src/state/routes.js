import { reactive, readonly } from 'vue'

const createState = () => {
    const state = reactive({
        classifyUrl: '',
        bookInfoUrl: ''
    }
    )
    const setState = (key, value) => {
        state[key] = value
    };
    return { setState, state: readonly(state) };
}

export default createState()

