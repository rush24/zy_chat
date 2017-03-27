<template>
  <div class="content">
  	<ul class="msg-ul" v-if="items">
  		<li v-for="(item, index) in items">
  				<p class="time">
  					<span>{{ item.create_at | filterDate }}</span>
  				</p>
  				<div class="main" :class="item.from_user == self ? 'self' : ''">
  					<img :src="item.avatar ? item.avatar : defaultAvatar">
  					<div class="text" @click="del(index, item.id)">{{ item.content }}</div>
  				</div>
  		</li>
  	</ul>
  </div>
</template>

<script>
import { center } from '@/utils/center'

export default {
	computed: {
		items() {
			const items = this.$root.msgs[this.$store.state.currUser]
			if (items) {
				items.sort((var1, var2) => {
					return var1.create_at - var2.create_at
				})
			}
			return items
		},
		defaultAvatar() {
			return this.$avatar
		},
		self() {
      return JSON.parse(sessionStorage.getItem('user')).user_name
    }
	},

	filters: {
		filterUsers() {
			/*
			const users = this.items
			if (users && users.length > 0) {
				for (let i = 0; i < users.length; i++) {
					
				}
			}
			return this
			*/
		},
		filterDate(val) {
			return new Date(1000 * val).Format('yyyy-MM-dd hh:mm:ss')
		}
	},

	methods: {
		del(index, id) {
			console.log(index, id)
			const items = this.items
			for (let i in items) {
				if (items[i].id == id) {
					center.$emit('send', {
						type: 'delete_message',
						friend_name: items[i].from_user,
						id: items[i].id
					})
					items.splice(i, 1)
					break
				}
			}
		}
	},

	directives: {
    // 发送消息后滚动到底部
    // ['scroll-bottom']() {
      // this.$nextTick(() => {
      	// this.$el.scrollTop = this.$el.scrollHeight - this.el.clientHeight
      // })
    // }*/
  }

}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		padding: 10px 15px;
		overflow-y: scroll;
		height: 440px;

		li {
			margin-bottom: 15px;
			.time {
				margin: 7px 0;
				text-align: center;
				span {
					display: inline-block;
					padding: 0 18px;
					font-size: 12px;
					color: #666;
				}
			}
			.main {
				img {
					width: 30px;
					height: 30px;
					float: left;
					margin: 0 10px 0 0;
					border-radius: 50%;
				}
				.text {
					display: inline-block;
					position: relative;
					padding: 0 10px;
					min-height: 30px;
					line-height: 2.5;
					font-size: 12px;
					text-align: left;
					word-break: break-all;
					background-color: #fafafa;
					border-radius: 4px;
					&:before {
						content: " ";
						position: absolute;
						top: 9px;
						right: 100%;
						border: 6px solid transparent;
						border-right-color: #fafafa;
					}
				}
			}
			.self {
				text-align: right;
				img {
					float: right;
					margin: 0 0 0 10px;
				}
				.text {
					background-color: #daf4fd;
					&:before {
						right: inherit;
						left: 100%;
						border-right-color: transparent;
						border-left-color: #daf4fd;
					}
					&:after {
						content: 'X';
						color: red;
						border: 1px solid black;
					}
				}
			}
		}
	}
</style>
