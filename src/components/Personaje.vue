<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import imagenFeliz from '../assets/personaje-feliz.png'
import imagenTriste from '../assets/personaje-triste.png'

const srcImagen = ref(imagenFeliz)
let timeout = null

function cambiarAImagenTriste() {
  srcImagen.value = imagenTriste
  hablar("¿Jugamos?")
}

function reiniciarTemporizador() {
  clearTimeout(timeout)
  srcImagen.value = imagenFeliz

  timeout = setTimeout(() => {
    cambiarAImagenTriste()
  }, 5000) 
}
function moverPersonaje(x, y) {
  const personaje = document.querySelector('.personaje')
  if (personaje) {
    personaje.style.left = `${x}px`
    personaje.style.top = `${y}px`
  }
}
function hablar(mensaje) {
  const sintesis = window.speechSynthesis
  const voz = new SpeechSynthesisUtterance(mensaje)
  voz.lang = 'es-ES'
  sintesis.speak(voz)
}

onMounted(() => {
  reiniciarTemporizador()
  window.addEventListener('click', reiniciarTemporizador)
  window.addEventListener('touchstart', reiniciarTemporizador)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
  window.removeEventListener('click', reiniciarTemporizador)
  window.removeEventListener('touchstart', reiniciarTemporizador)
})
</script>

<template>
  <img :src="srcImagen" alt="personaje" class="personaje" />
</template>

<style scoped>
.personaje {
  position: absolute;
  bottom: 50px;
  left: 60px;
  width: 120px;
  transition: all 0.3s ease;
  animation: flotar 1s infinite alternate;
}

@keyframes flotar {
  from {
    transform: translateY(29px);
  }
  to {
    transform: translateY(19px);
  }
}
</style>
