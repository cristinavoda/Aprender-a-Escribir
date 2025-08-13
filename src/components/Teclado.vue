
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

function presionar(letra) {
  emit('input', letra)
  
  const audio = new Audio('/click-sound.mp3') 
  audio.play()
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
.teclado ::v-deep button {
  font-size: 4vw;
  min-width: 40px;
  min-height: 35px;
}
.teclado button {
  font-size: 2,5vw;
  padding: 0.4rem;
  color: blue;
  width: 12vw;
  height: 8vw;
  min-width: 40px; 
  min-height: 35px;
  border-color:#33add6;
  background-color: #d9d8f065;
  box-shadow: 6px 6px 6px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
  
}
@media (max-width: 768px) {
  .teclado button {
    width: 12vw;
    height: 8vw;
    font-size: 1rem;
    
  }
}

@media (max-width: 480px) {
  .teclado button {
    width: 14vw;
    height: 10vw;
    font-size: 0.9rem; 
  }
}

</style>
