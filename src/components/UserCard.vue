<template>
  <div class="card">
    <header>
      <img class="avatar" :src="user.avatar ? user.avatar : defaultAvatar">
      <p>{{ user.user_name }}</p>
    </header>
    <footer>
      <input type="text" placeholder="search user..." v-model="target" @keyup="enter">
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      target: ''
    }
  },

  computed: {
    user() {
      return JSON.parse(sessionStorage.getItem('user'))
    },
    defaultAvatar() {
      return this.$avatar
    }
  },

  methods: {
    enter(e) {
      if (e.keyCode === 13 && this.target.length > 0) {
        this.$request.get('/api/find_friend/' + this.target)
          .then(res => {
            const data = res.data
            if (data) {
              this.$store.state.users.push({user_name: data.user_name})
            }
          })
          .catch(err => {
            this.$alert('该用户不存在','提示', {})
          })
      }
    }
  },

  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.card {
  padding: 12px;
  border-bottom: 2px solid #f4f4f4;
  header {
    img,
    p {
      vertical-align: middle;
    }
    img {
      border-radius: 2px;
      width: 40px;
      height: 40px;
    }
    p {
      display: inline-block;
      margin: 0 0 0 15px;
      font-size: 16px;
    }
  }
  footer {
  	margin-top: 10px;
  	input {
  		padding: 0 10px;
  		width: 100%;
  		font-size: 12px;
  		color: #666;
  		line-height: 30px;
  		border: 1px solid #efeded;
  		border-radius: 4px;
  		outline: none;
  		background-color: #fff;
  	}
  }
}
</style>
