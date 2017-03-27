import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import store from './store'
import './utils'
import SelfPlugin from './plugins/app'
import { center } from './utils/center'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(SelfPlugin)

const mx = {
	data: {
		socket: {},
		msgs: {}
	},

	methods: {
		send(data) {
			this.socket.send(JSON.stringify(data))
		}
	},
	mounted() {
		this.socket = new WebSocket('ws://112.74.36.107:9000/api/message')
		this.socket.addEventListener('open', event => {
			console.log('mixin open')
		})
		this.socket.addEventListener('message', event => {
			const res = JSON.parse(event.data)
			const time = new Date()
			console.log(`server response: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, res)
			// get friends
			if (res.type == 'get_friends') {
				this.$store.state.users = res.friends
			}
			// get message list
			else if (res.type == 'get_messages') {
				const users = this.$store.state.users
				for (let i = 0; i < users.length; i++) {
					if (res.friend_name == users[i].user_name) {
						this.$set(this.msgs, res.friend_name, res.messages)
						break
					}
				}
			}
			// get chat message
			else if (res.type == 'message') {
				const msg = {
				} = res
				console.log(msg)
				// save received message
				const _msgs = this.msgs[msg.from_user]
				_msgs != undefined && _msgs != null ? _msgs : []
				_msgs.push(msg)
				const from_user = msg.from_user
				const users = this.$store.state.users
				// unread message count
				if (users && users.length > 0 && this.$store.state.currUser != from_user) {
					for (let i = 0; i < users.length; i++) {
						if (from_user == users[i].user_name) {
							users[i].unread_count += 1
						}
					}
				}

				// this.msgs[msg.from_user].push(msg)
				// send from self
				if (msg.from_user && msg.to_user
					&& msg.from_user == msg.to_user) {
					msg.from_user = JSON.parse(sessionStorage.getItem('user')).user_name
				}
			}
		})
	},

	created() {
		center.$on('send', (data) => {
			this.send(data)
		})
	}

}

new Vue({
  router,
  store,
  mixins: [mx]
}).$mount('#app')

