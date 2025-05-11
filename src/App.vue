<template>
  <div id="app">
    <h1>Aprendo a Escribir ✍️</h1>
    <AppNavbar />
    <router-view />
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
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
