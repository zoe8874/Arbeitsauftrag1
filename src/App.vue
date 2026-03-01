<script setup>
import Nav from './components/Nav.vue'
</script>

<template>
  <Nav />
  <router-view />
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

#app {
  width: 1000px;
  margin: 0 auto;
  background-color: #f4f4f4;
  min-height: 100vh;
}
</style>