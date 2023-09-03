import { createApp, Vue } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import axios from 'axios';
import store from './store/store';

loadFonts()

const app = createApp(App)

app.config.globalProperties.$axios = axios;

app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')

