<script setup>
</script>

<template>

<nav class="navbar">
       
        
       
        
        <ul class="nav-links" id="navLinks">
            <li><router-link to="/">Startseite</router-link></li>
              <li><router-link to="/Login">Login</router-link></li>
           
            
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
}


.nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
}
.nav-links li a {
    text-decoration: none;
    color: white;
    font-weight: 500;
}
.nav-links li a:hover {
    text-decoration: underline;
}
</style>