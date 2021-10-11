import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home/index.vue'
import policy from '../views/policy/index.vue'
import service from '../views/service/index.vue'
import my from '../views/my/index.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/policy', component: policy },
        { path: '/service', component: service },
        { path: '/my', component: my },
    ]
})

export default router