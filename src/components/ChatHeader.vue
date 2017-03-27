<template>
	<div class="chat-header">
		<span @click="logout">退出</span>
	</div>
</template>

<script>
	export default {
		methods: {
			logout() {
				this.$confirm('退出登录?', '提示', {
				}).then(() => {
					sessionStorage.removeItem('user')
					this.$router.push('/login')
				}).catch(() => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
.chat-header {
	width: 100%;
	height: 40px;
	background: #fff;
	border-bottom: 1px solid #ddd;
	line-height: 40px;
	span {
		float: right;
		margin-right: 15px;

	}
}
</style>