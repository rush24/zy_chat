<template>
  <section class="home-container">
    <!-- 左边侧栏 -->
    <div class="sidebar">
      <user-card></user-card>
      <user-list></user-list>
    </div>
    <!-- 右边聊天窗体 -->
    <div class="main">
      <chat-header></chat-header>
      <chat-content></chat-content>
      <chat-entry></chat-entry>
    </div>
  </section>
</template>
<script>
import userCard from '@/components/UserCard'
import userList from '@/components/UserList'
import chatHeader from '@/components/ChatHeader'
import chatContent from '@/components/ChatContent'
import chatEntry from '@/components/ChatEntry'

export default {
  components: {
    userCard,
    userList,
    chatHeader,
    chatContent,
    chatEntry
  },

}
</script>
<style lang="scss" scoped>
.home-container {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
  .sidebar,
  .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #fdfdfd;
    border-right: 1px solid #f4f4f4;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
}
</style>
