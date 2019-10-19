import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/login',
          component: () => import('@/views/Login'),
          meta: {
            requiresAuth: false
          }
        }
      ]
    }
  ]
})
