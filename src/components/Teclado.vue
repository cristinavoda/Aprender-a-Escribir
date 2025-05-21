
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
  font-size: 3rem;
  padding: 0.4rem;
  color: blue;
  width: 95px;
  height: 65px;
  border-color:#87cbe2;
  background-color: #d9d8f065;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
  
}
</style>
