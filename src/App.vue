<template>

  <div id="app" @mousemove="moverConRaton">
    <AppNavbar />
<RouterView 
  @accionUsuario="moverPersonaje"
  @cambiarEstadoPersonaje="cambiarImagenPersonaje"
/>
    <img
      src="./assets/personaje.png"
      alt="Personaje"
      class="personaje"
      :style="{ left: `${x}px`, top: `${y}px` }"
    />

<div class="personaje" :class="estadoPersonaje">
  <img
    v-if="estadoPersonaje === 'feliz'"
    src="./assets/personaje-feliz.png"
    alt="feliz"
  />
  <img
    v-else-if="estadoPersonaje === 'triste'"
    src="./assets/personaje-triste.png"
    alt="triste"
  />
 
</div>

    
    <div class="train-container">
      <div class="train" @animationend="onTrainStop">
        🚂
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import Personaje from './components/Personaje.vue'
import imagenFeliz from './assets/personaje-feliz.png'
import imagenTriste from './assets/personaje-triste.png'

const srcImagen = ref(imagenFeliz)
const estado = ref('feliz') // ahora sí, ref interno

const inactivo = ref(false)
let timeout

// Reinicia temporizador de inactividad
const reiniciarTemporizador = () => {
  clearTimeout(timeout)
  inactivo.value = false
  estado.value = 'feliz'
  srcImagen.value = imagenFeliz

  timeout = setTimeout(() => {
    inactivo.value = true
    estado.value = 'triste'
    srcImagen.value = imagenTriste
  }, 7000)
}

// Movimiento del personaje
const x = ref(100)
const y = ref(100)

function moverConRaton(event) {
  x.value = event.clientX
  y.value = event.clientY
}

const estadoPersonaje = ref('feliz')
const emit = defineEmits(['cambiarEstadoPersonaje'])

// Validación de respuesta
function verificarRespuesta(correcta) {
  if (correcta) {
    cambiarImagenPersonaje('feliz')
  } else {
    cambiarImagenPersonaje('triste')
  }
}

// Cambiar imagen del personaje
function cambiarImagenPersonaje(nuevoEstado) {
  estadoPersonaje.value = nuevoEstado
  if (nuevoEstado === 'triste') {
    setTimeout(() => {
      estadoPersonaje.value = 'feliz'
    }, 2000)
  }
}

onMounted(() => {
  window.addEventListener('click', reiniciarTemporizador)
  window.addEventListener('touchstart', reiniciarTemporizador)
  reiniciarTemporizador()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', reiniciarTemporizador)
  window.removeEventListener('touchstart', reiniciarTemporizador)
  clearTimeout(timeout)
})
</script>



  



<style>
#app {
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: blue;
  font-size: x-large;
  position: relative;
  overflow: hidden;
}

.personaje {
  position: absolute;
  width: 80px;
  height: auto;
  transition: left 0.1s ease, top 0.1s ease;
  
  z-index: 999;
}

.train-container {
  width: 100%;
  height: 190px;
  overflow: hidden;
  position: relative;
  background-color: transparent;
  border-bottom: 1px solid #3d3fc0;
  margin-left: 550px;
}

.train {
  margin-top: 30px;
  position: absolute;
  font-size: 5rem;
  left: -20%;
  animation: moveTrain 5s ease-in-out forwards;
}

@keyframes moveTrain {
  0% {
    transform: translateX(-190px);
  }
  30% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
}
.personaje.feliz img {
  animation: saltar 1s ease-in-out;
}
.personaje.triste img {
  filter: grayscale(1);
  animation: encoger 1s ease-in-out;
}

@keyframes saltar {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

@keyframes encoger {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}
@keyframes moverSuave {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
@media (max-width: 600px) {
  .navbar {
    padding: 8px 12px;
  }

  .contenido {
    margin-top: 50px;
  }
}

</style>
