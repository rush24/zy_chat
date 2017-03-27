<template>
  <div class="entry">
  	<textarea placeholder="Enter 发送" v-model="content" @keyup="enter"></textarea>
  </div>
</template>

<script>
import { center } from '@/utils/center'
export default {
	data() {
		return {
			content: ''
		}
	},

	methods: {
		enter(e) {
			if (e.keyCode === 13 && this.content.length) {
				center.$emit('send', {
					type: 'send_message',
					friend_name: this.$store.state.currUser,
					content: this.content
				})
				this.content = ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.entry {
		height: 120px;
		border-top: 1px solid #ddd;
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		textarea {
			padding: 10px;
			height: 100%;
			width: 100%;
			border: none;
			outline: none;
			resize: none;
		}
	}
</style>