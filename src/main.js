import { Plugin } from './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const vm = createApp(App)


vm.use(router)
vm.use(Plugin)
vm.mount('#app')

export default vm