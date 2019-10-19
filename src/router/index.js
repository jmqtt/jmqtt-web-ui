import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '',
      name: 'Layout',
      component: Layout,
      children: [{
        path: '/dashboard',
        component: () => import('@/views/dashboard/Index')
      }, {
        path: '/products',
        component: () => import('@/views/products/List')
      }]
    }
  ]
})
