import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const About = resolve => require(['@/views/About'], resolve)
const Form = resolve => require(['@/views/Form'], resolve)
const FormDetail = resolve => require(['@/views/FormDetail'], resolve)
const FormEdit = resolve => require(['@/views/FormEdit'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/form/add',
        component: FormEdit
    },
    {
        path: '/forms/:id',
        component: FormDetail
    },
    {
        path: '/forms/:id/edit',
        component: FormEdit
    },
    {
        path: '/',
        component: Form
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(transition => {
    NProgress.done()
})

export default router
