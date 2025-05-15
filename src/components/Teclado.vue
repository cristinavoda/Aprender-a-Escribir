
<template>
  <div class="teclado">
    <button v-for="letra in letras" :key="letra" @click="escribir(letra)">
      {{ letra }}
    </button>
    <button @click="borrar">⌫</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits([])

const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

function escribir(letra) {
  emit('input', letra)
}

function borrar() {
  emit('input', 'BORRAR')
}
</script>

<style scoped>
.teclado {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.teclado button {
  font-size: 2.5rem;
  color: blue;
  padding: 10px;
  border-color: rgb(211, 226, 226);
  
  border-radius: 8px;
  
}
</style>
