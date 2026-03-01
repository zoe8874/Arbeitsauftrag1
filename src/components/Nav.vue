<script setup>
import { useRouter } from "vue-router";
import { isLoggedIn } from "../auth";

const router = useRouter();

function handleLogout() {
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  router.push("/login");
}
</script>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><router-link to="/">Startseite</router-link></li>
       <li v-if="!isLoggedIn"><router-link to="/register">Registrieren</router-link></li>
      <li><router-link to="/Produkt">Produkt</router-link></li>
      <li><a href="https://disclaimer.bbzwinf.ch/" target="_blank">Disclaimer</a></li>

      <li v-if="!isLoggedIn">
        <router-link to="/Login">Login</router-link>
      </li>

      <li v-if="isLoggedIn" @click="handleLogout" style="cursor:pointer;">
        Logout
      </li>
    </ul>
  </nav>
</template>


   
<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #4CAF50;
    color: white;
    width: 100%;
    box-sizing: border-box;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.nav-links li a {
    text-decoration: none;
    color: white;
    font-weight: 500;
    font-size: 1.1rem;
}

.nav-links li a:hover {
    text-decoration: underline;
}


</style>