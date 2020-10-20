<template>
  <div id="nav" v-show="$route.meta.showNav">
    <router-link to="/">发现</router-link> |
    <router-link to="/search_book" tag="div">搜索</router-link>
    |
    <router-link to="/book_shelf" tag="div">书架</router-link>
  </div>
  <router-view v-slot={Component}>
    <keep-alive exclude="ReadBook"><component :is="Component" /></keep-alive>
  </router-view>
  <!-- <router-view /> -->
</template>

<style lang="less">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  
  color: @title-color;
  text-decoration: none;
  font-size: 18px;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: @title-color-active;
}
.van-nav-bar i.van-icon {
  color: @title-color-active
}
</style>
