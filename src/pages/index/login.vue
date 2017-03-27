<template>
	<section>
		<el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
	    <h3 class="title">ZY-Chat</h3>
	    <el-form-item prop="user_name">
	      <el-input type="text" v-model="form.user_name" auto-complete="off" placeholder="账号"></el-input>
	    </el-form-item>
	    <el-form-item prop="password">
	      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
	    </el-form-item>
	    <el-form-item style="width:100%;">
	      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
	    </el-form-item>
		  <router-link to="/register">注册</router-link>
	  </el-form>	
	</section>
  
</template>
<script>
export default {
  data() {
      return {
        logining: false,
        form: {
          user_name: '',
          password: ''
        },
        rules: {
          user_name: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
          ]
        }
      };
    },
    methods: {
      login() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.logining = true;
            this.$request.post('/api/login', this.form)
            .then(res => {
            	const data = res.data
            	if (data && data.message == 'success') {
            		sessionStorage.setItem('user', JSON.stringify(this.form))
            		this.$router.push({
            			path: '/home'
            		})
            	}
            	this.logining = false
            })
            .catch(err => {
            	this.logining = false
            	this.$alert('账号密码不正确', '提示', {
            	})
            	console.error(err)
	            return false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
}
</script>
<style lang="scss" scoped>
.login-container {
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #F9FAFC;
  margin: 180px auto;
  // border: 2px solid #8492A6;
  width: 350px;
  padding: 35px 35px 15px 35px;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
