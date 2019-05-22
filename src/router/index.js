import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const Home = resolve => require(['@/views/Home'], resolve)
const Form = resolve => require(['@/views/Form'], resolve)
const FormDetail = resolve => require(['@/views/FormDetail'], resolve)
const FormEdit = resolve => require(['@/views/FormEdit'], resolve)
const Submit = resolve => require(['@/views/Submit'], resolve)
const SubmitDetail = resolve => require(['@/views/SubmitDetail'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)
const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/oauth/callback',
        component: OauthCallback
    },
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
        path: '/forms',
        component: Form
    },
    {
        path: '/forms/:id/submits',
        component: Submit
    },
    {
        path: '/submits/:id',
        component: SubmitDetail
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
