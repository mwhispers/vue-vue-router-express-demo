import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import axios from 'axios'
import Vodal from 'vodal'
import 'muse-ui/dist/muse-ui.css'
import 'vodal/common.css'
import 'vodal/rotate.css'
import router from './router/index.js'

Vue.use(MuseUI);
Vue.component(Vodal.name,Vodal);
Vue.prototype.$http = axios;
const root = document.createElement("div");
document.body.appendChild(root);
MuseUI.theme.use('light');

new Vue({
    router:router,
    render:(h)=>h(App)
}).$mount(root);