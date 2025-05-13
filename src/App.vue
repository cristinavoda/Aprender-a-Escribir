<template>
  <div id="app">
    
    <AppNavbar />
    <router-view />
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue';
import Teclado from './components/Teclado.vue';


</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  color: blue;
  font-size: x-large;
}
</style>
