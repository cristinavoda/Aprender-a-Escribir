<template>
  <nav class="navbar">
    <router-link to="/">🏠 Seleccionar</router-link>
    <router-link to="/referencia">🏠Referencia</router-link>
    <router-link to="/escribir">✍️ Escribir</router-link>
    <router-link to="/puzzle">🧩 Puzzle</router-link>
     <router-link to="/practicar">✍️ Practicar</router-link>
     <router-link to="/galeria">🏠Galeria</router-link>
    <router-link to="/PuzzleFlotante">🧩PuzzleFlotante</router-link>
     
     
  </nav>
  
</template>

<script setup>

</script>

<style scoped>
.navbar {
  display: flex;
  margin-left: -250px;
  width: fit-content;
  justify-content:left;
  gap: 2rem;
  padding: 1rem;
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