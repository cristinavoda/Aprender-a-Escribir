<template>
<div class="app-container">

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
</div>
</template>



<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import Personaje from './components/Personaje.vue'
import imagenFeliz from './assets/personaje-feliz.png'
import imagenTriste from './assets/personaje-triste.png'
import { RouterLink, RouterView } from 'vue-router'




const isOpen = ref(false)
const trainNavbarRef = ref(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => { 
  isOpen.value = false
}

const srcImagen = ref(imagenFeliz)
const estado = ref('feliz') 

const inactivo = ref(false)
let timeout


const reiniciarTemporizador = () => {
  clearTimeout(timeout)
  inactivo.value = false
  estado.value = 'feliz'
  srcImagen.value = imagenFeliz

  timeout = setTimeout(() => {
    inactivo.value = true
    estado.value = 'triste'
    srcImagen.value = imagenTriste
  }, 9000)
}


const x = ref(2000)
const y = ref(2000)

function moverConRaton(event) {
  x.value = event.clientX
  y.value = event.clientY
}

const estadoPersonaje = ref('feliz')
const emit = defineEmits(['cambiarEstadoPersonaje'])

function verificarRespuesta(correcta) {
  if (correcta) {
    cambiarImagenPersonaje('feliz')
  } else {
    cambiarImagenPersonaje('triste')
  }
}


function cambiarImagenPersonaje(nuevoEstado) {
  estadoPersonaje.value = nuevoEstado
  if (nuevoEstado === 'triste') {
    setTimeout(() => {
      estadoPersonaje.value = 'feliz'
    }, 9000)
  }
}
const robiImagen = ref('personaje.png')

const moverPersonaje = () => {
  
  console.log("Moviendo personaje…")
}
function handleClickOutside(event) {
  if (navbarRef.value && !navbarRef.value.contains(event.target)) {
    (navbarOpen.value = false)
  }
}


onMounted(() => {
  window.addEventListener('click', reiniciarTemporizador)
  window.addEventListener('touchstart', reiniciarTemporizador)
  reiniciarTemporizador()
   document.addEventListener('click', handleClickOutside)
   
})
console.log("App montada")

onBeforeUnmount(() => {
  window.removeEventListener('click', reiniciarTemporizador)
  window.removeEventListener('touchstart', reiniciarTemporizador)
  clearTimeout(timeout)
  document.removeEventListener("click", handleClickOutside);
})
</script>



  



<style scoped>
.hamburger {
  margin-top: 10px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.personaje.feliz img {
  animation: saltar 1s ease-in-out;
  margin-top: 90px;
  
  
}
.personaje.triste img {
  
   margin-top: 90px;
  animation: encoger 1s ease-in-out;
}
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  position: relative;
  padding: 0.5rem;
  background: #004d4d;
  color: white;
}
.toggle-btn {
  margin-top: 10px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}

nav {
   position: relative;
  display: none;
  flex-direction: column;
  background: white;
  position: absolute;
  top: 50px;
  left: 0;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 100;
}

nav a {
  padding: 1rem;
  text-decoration: none;
  color: #004d4d;
  border-bottom: 1px solid #ccc;
}

nav a:hover {
  background: #e0f0f0;
}

nav.is-open {
  display: flex;
}


ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav.open ul {
  display: block;
}


@media (min-width: 768px) {
  .toggle-btn {
    display: none;
  }
  ul {
    display: none;
  }
}


.robi-container {
  text-align: center;
  margin: 1rem 0;
}

.robi {
  max-width: 150px;
  transition: transform 0.3s;
}
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
  transition: left 0.20s ease, top 0.20s ease;
  
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
  nav ul {
    position: absolute;
    top: 50px;
    left: 0;
    background: white;
    width: 100%;
  }
}

</style>
