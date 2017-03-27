import Axios from 'axios'

// server hostname
const hostname = 'http://112.74.36.107:9000'

const defaultAvatar = 'http://git.oschina.net/uploads/39/516039_vengeancehuang.png'

// ajax request object
const axios = Axios.create({
	baseURL: hostname,
	withCredentials: true
})

// const socket = new WebSocket('ws://112.74.36.107:9000/api/message')
// socket.addEventListener('open', event => {
// 	console.log('socket open')
// })

// socket.addEventListener('message', event => {
// 	console.log('get server message', event.data)
// })

// plugin
const install = (Vue) => {
	Object.defineProperties(Vue.prototype, {
		$request: {
			get() {
				return axios
			}
		},
		$hostname: {
			get() {
				return hostname
			}
		},
		$avatar: {
			get() {
				return defaultAvatar
			}
		},
		$socket: {
			get() {
				return socket
			}
		}
	})
}

export default install