import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		sessionStorage.removeItem('user')
	}
	const user = JSON.parse(sessionStorage.getItem('user'))
	if (!user && to.path != '/login' && to.path != '/register') {
		next({ path: '/login' })
	} else {
		next()
	}
})

export default router
