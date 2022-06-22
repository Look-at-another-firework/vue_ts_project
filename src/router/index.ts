import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRouter } from '../http/api'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/home/order'
    // children: [
    //   {
    //     path: 'order',
    //     name: 'order',
    //     meta: {
    //       isShow: true,
    //       title: '商品列表'
    //     },
    //     component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
    //   },
    //   {
    //     path: 'userList',
    //     name: 'userList',
    //     meta: {
    //       isShow: true,
    //       title: '用户列表'
    //     },
    //     component: () => import(/* webpackChunkName: "userList" */ '../views/UserView.vue')
    //   },
    //   {
    //     path: 'roleList',
    //     name: 'roleList',
    //     meta: {
    //       isShow: true,
    //       title: '角色列表'
    //     },
    //     component: () => import(/* webpackChunkName: "roleList" */ '../views/RoleView.vue')
    //   },
    //   {
    //     path: 'authority',
    //     name: 'authority',
    //     meta: {
    //       isShow: false,
    //       title: '权限列表'
    //     },
    //     component: () => import(/* webpackChunkName: "authority" */ '../views/AuthorityView.vue')
    //   }
    // ]
  },
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/loginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  let token: string | null = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (to.path !== 'login' && token) {
    if (router.getRoutes().length === 3) {
      const res: any = await getRouter()
      res.data.forEach((v: any) => {
        let routerObj: RouteRecordRaw = {
          path: v.name,
          name: v.name,
          meta: v.meta,
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${v.path}.vue`)
        }
        router.addRoute('home', routerObj)
      })
      router.replace(to.path)
    }
  } else if (to.path === 'login' && token) {
    return '/'
  }
})

export default router
