<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
button,
input,
select {
  margin: 0;
  padding: 0;
  list-style: none;
  font-style: normal;
  color: #333;
	text-decoration: none;
  border: none;
}

body {
  color: #4d4d4d;
  font: 14px/1.4em 'Helvetica Neue', Helvetica, 'Microsoft Yahei', Arial, sans-serif;
  background: #f5f5f5 url('assets/bg.jpg') no-repeat center;
  background-size: cover;
  font-smoothing: antialiased;
}
</style>
