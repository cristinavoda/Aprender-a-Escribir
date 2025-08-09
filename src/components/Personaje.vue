<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import imagenFeliz from '../assets/personaje-feliz.png'
import imagenTriste from '../assets/personaje-triste.png'
const x = ref(0)
const y = ref(0)
const visible = ref(false)
const esquina = ref('top-left')
const isMobile = ref(false)

const handleMouseMove = (event) => {
  if (!isMobile.value) {
    
    x.value = event.clientX + 40
    y.value = event.clientY + 40
  }
}
const cambiarEsquina = () => {
  const esquinas = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
  esquina.value = esquinas[Math.floor(Math.random() * esquinas.length)]
  visible.value = true
  setTimeout(() => { visible.value = false }, 3000) // se esconde después de 3s
}

let timer
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
let animTimer
onMounted(() => {
  animTimer = setInterval(() => {
    
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(animTimer)
})

onMounted(() => {
  reiniciarTemporizador()
  window.addEventListener('click', reiniciarTemporizador)
  window.addEventListener('touchstart', reiniciarTemporizador)
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    document.addEventListener('mousemove', handleMouseMove)}
    timer = setInterval(cambiarEsquina, 5000)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
  window.removeEventListener('click', reiniciarTemporizador)
  window.removeEventListener('touchstart', reiniciarTemporizador)
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>
<template>
  <img
    v-if="visible"
    src="./personaje.png"
    alt="Personaje"
    class="personaje"
    :class="[esquina]"
    :style="!isMobile ? { top: y + 'px', left: x + 'px' } : {}"
  />

</template>
<style scoped>

.personaje {
  pointer-events: none;
  position: absolute;
  bottom: 50px;
  left: 60px;
  width: 120px;
  transition: all 0.3s ease;
  animation: flotar 1s infinite alternate;
  z-index: 1000;
  animation: asomar 1.5s ease-out;
}
.top-left {
  top: 0;
  left: 0;
}

.top-right {
  top: 0;
  right: 0;
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

@keyframes flotar {
  from {
    transform: translateY(99px);
  }
  to {
    transform: translateY(99px);
  }
}
@keyframes aparecer-por-esquina {
  0% { transform: translate(-150%, -150%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(0, 0); }
}

@keyframes asomar {
  0% {
    transform: translate(-100%, -100%) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

</style>
