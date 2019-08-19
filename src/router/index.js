import Vue from 'vue'
import Router from 'vue-router'
import List from '../components/List.vue'
import Detail from '../components/detail.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            name:'List',
            component:List
        },
        {
            path:'/movie/:title',
            name : 'detail',
            component : Detail   
        }
    ]
})