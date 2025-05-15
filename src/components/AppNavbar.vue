<template>
  <nav class="navbar">
     <router-link to="/Alfabeto">📌Alfabeto</router-link>
     <router-link to="/escribir">✍️ Escribir</router-link>
     <router-link to="/dibujar">✏️ Dibujar</router-link>
    <router-link to="/">⌨️ Seleccionar</router-link>
    <router-link to="/puzzle">🧩 Puzzle</router-link>
    <router-link to="/practicar">✍️ Practicar</router-link>
     <router-link to="/galeria">🎞️Galeria</router-link>
    <router-link to="/Letras">📌Letras</router-link>
    
    
     
  </nav>
  
</template>

<script setup>

</script>

<style scoped>
.navbar {
  top: 10px;
  display: flex;
  margin-top: 0,2vh;
  margin-left: -120px;
  width: fit-content;
  justify-content:left;
  gap: 1rem;
  padding: 01rem;
  background: #0c64bd;
}
.navbar a {
  color: #ffffff;
  text-decoration: none;
}
.router-link-exact-active {
  text-decoration: underline;
  color: #2c728a;
}
.router-link-hover {
  color: aqua;
}
</style>