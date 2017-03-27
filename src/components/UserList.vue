<template>
  <div class="list">
    <ul>
      <li :class="user.user_name == currUser ? 'active' : ''" v-for="(user,index) in users" @click="selectChat(user.user_name, index)">
        <img :src="user.avatar ? user.avatar : defaultAvatar">
        <p>{{ user.user_name }} +{{ user.unread_count }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { center } from '@/utils/center'

export default {
	computed: {
    users() {
      return this.$store.state.users
    },
		currUser() {
			return this.$store.state.currUser
		},

    defaultAvatar() {
      return this.$avatar
    }
	},

	methods: {
		selectChat(user_name, index) {
      if (user_name) {
        this.$store.state.currUser = user_name
        const msgs = this.$root.msgs[user_name]
        if (msgs == null || msgs.length <= 0) {
          center.$emit('send', {
            type: 'get_messages',
            friend_name: user_name
          })
        }
        const user = this.$store.state.users[index]
        if (user.unread_count > 0) {
          user.unread_count = 0
          center.$emit('send', {
            type: 'read_message',
            friend_name: user_name
          })
        }
      }
		},
    getFriends() {
      this.$request.get('/api/friends')
        .then(res => {
          console.log(res)
          const data = res.data
          if (data) {
            this.$store.commit('storeTalkers', data)
          }
        })
        .catch(err => {
          this.$alert('获取聊天列表失败', '提示', {})
        })
    }
	},

	mounted() {
		this.selectChat(this.$store.state.currUser)
    this.getFriends()
	}
}
</script>
<style lang="scss" scoped>
.list {
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    transition: background-color .1s;
    &:hover {
      // background-color: rgba(255, 0, 0, 0.03);
      background-color: rgba(239, 241, 245, 0.5);
    }
    &.active {
      background-color: rgba(239, 241, 245, 1);
      // background-color: rgba(0, 0, 0, 0.1);
    }
    img,
    p {
      vertical-align: middle;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    p {
      display: inline-block;
      margin: 0 0 0 15px;
    }
  }
}
</style>
