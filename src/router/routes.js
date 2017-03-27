import App from '@/App'

import home from '@/pages/home'
import login from '@/pages/index/login'
import register from '@/pages/index/register'

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
      	path: '/home',
      	component: home
      },
      {
        path: '/login',
        component: login
      },
      {
        path: '/register',
        component: register
      }
    ]
  }
]

export default routes
