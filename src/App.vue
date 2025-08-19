<script setup lang="ts">
import { RouterView, useRouter } from "vue-router"
// import HelloWorld from "./components/HelloWorld.vue"
const router = useRouter()
function goHome() {
  router.push("/")
}
function goAbout() {
  router.push("/about")
}
</script>

<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <div class="logos">
      <t-button @click="goHome">Home</t-button>
      <t-button @click="goAbout">About</t-button>
    </div>

    <!-- <HelloWorld msg="Vite + Vue" /> -->

    <!-- 路由 -->
    <RouterView />
  </div>
</template>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.nav {
  padding: 2rem 0;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0.5rem;
  text-decoration: none;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
