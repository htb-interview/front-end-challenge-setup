<template>

  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

export default {
  name: 'app',
  components: { }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #969696;
  background:	rgb(54,54,54);
  height: 100vh;
  overflow-x: hidden;
}

</style>