export default {
  // 获取用户信息
  storeTalkers(state, payload) {
    console.log(payload)
    if (payload) {
      state.users = payload
      if (payload.length > 0) {
        state.currUser = state.users[0].user_name
      }
    }
  },

  // 切换会话
  selectChat(state, payload) {
  	state.currUser = payload
  	const users = state.talkers
  	for (let i = 0; i < users.length; i++) {
  		if (state.currUser == users[i].user_name) {
  			state.curMsgs = users[i].last_msg
  			return
  		}
  	}
  },
}
