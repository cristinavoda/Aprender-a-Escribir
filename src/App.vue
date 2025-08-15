<template>
<div class="app-container">

  <div id="app" @mousemove="moverConRaton">
    
    
    <AppNavbar />
<RouterView 
  @accionUsuario="moverPersonaje"
  @cambiarEstadoPersonaje="cambiarImagenPersonaje"
/>
  <img
  :src="personaje"
  alt="Personaje"
  class="personaje"
  
  :style="{ left: `${x}px`, top: `${y}px`  }"
  
/>
<div class="personaje-root"></div>
 <div 
      v-if="estadoPersonaje === 'feliz'" 
      ref="personajeRef" 
      class="leo-container"
    >
      <img :src="personajeFeliz" alt="Leo" class="leo-img" />
      <button 
        class="globo-btn" 
        @mouseover="personajeEscapa"
      > 🎈</button>
       <p>Leo</p>
    </div>

    
    <div v-else-if="estadoPersonaje === 'triste'" class="triste-container">
      <img 
        :src="personajeTriste"
        alt="triste"
        class="triste-img"
      />
      
    </div>
    
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
import personaje from './assets/personaje.png'
import personajeFeliz from './assets/personaje-feliz.png'
import personajeTriste from './assets/personaje-triste.png'
import { RouterLink, RouterView } from 'vue-router'

import imagenFeliz from './assets/personaje-feliz.png'
import imagenTriste from './assets/personaje-triste.png'
import gsap from 'gsap'
import BotonProximaParada from './components/BotonProximaParada.vue';

const nivelActual = ref(0); 

function siguienteParada() {
  if (nivelActual.value < 9) { 
    nivelActual.value++;
  }
}

gsap.to(personajeFeliz.value, {
  x: -30,
    y: -30,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })




const srcImagen = ref(imagenFeliz)
const estado= ref('feliz') 

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
  emit('cambiarEstadoPersonaje', nuevoEstado) 
  if (nuevoEstado === 'triste') {
    setTimeout(() => {
      estadoPersonaje.value = 'feliz'
      emit('cambiarEstadoPersonaje', 'feliz')
    }, 9000)
  }
}



const robiImagen = ref('personaje.png')

const moverPersonaje = () => {
  
  console.log("Moviendo personaje…")
}
const personajeRef = ref(null)

onMounted(() => {
  
  gsap.to(personajeRef.value, {
    y: -10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})

function personajeEscapa() {
  gsap.to(personajeRef.value, {
    x: '-70vw',
    y: '680vh',
    duration: 1,
    ease: 'bounce.out',
    onComplete: () => {
      setTimeout(() => {
        gsap.to(personajeRef.value, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.inOut'
        })
      }, 2000)
    }
  })
}


onMounted(() => {
  window.addEventListener('click', reiniciarTemporizador)
  window.addEventListener('touchstart', reiniciarTemporizador)
  reiniciarTemporizador()
   
   
})
console.log("App montada")
onMounted(() => {
  gsap.to(personajeFeliz.value, {
    y: -90,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('click', reiniciarTemporizador)
  window.removeEventListener('touchstart', reiniciarTemporizador)
  clearTimeout(timeout)
  
})
</script>


<style scoped>
.leo-container {
  position: fixed;
  top: 40px;
  right: 15px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  color: #e0f0f0;
}

.leo-img {
  width: 100px;
   transition: transform 0.3s;
}
.globo-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: -145px;
  margin-left: 120px;
  font-size: 84px;
  
  color: white;
  font-weight: bold;
  width: 40px;
  height: 60px;
  border-radius: 50% / 60%;
  display: flex;
  align-items: center;
  justify-content: center;

  
  position: relative;
}

@media (max-width: 768px) {
  .leo-container {
    top: 10px;
    right: 10px;
    transform: scale(0.75);
  }

  .globo-btn {
    margin-top: -100px;
    margin-left: 80px;
    font-size: 60px;
  }
}

@keyframes escapar {
  to {
    transform: translateY(-200px) rotate(-20deg);
    opacity: 0;
  }
}
.personaje-feliz img {
   position: fixed;
  animation: saltar 1s ease-in-out;
  top: 40px;
  right: 42px;
  width: 100px; 
  z-index: 1000;
  pointer-events: none; 
  
}
@media (max-width: 768px) {
  .personaje-feliz {
    top: 5px;    
    right: 5px;  
    transform: scale(0.8); 
  }
}
.personaje-triste img {
  position: absolute;
   top: 0px;
  animation: encoger 1s ease-in-out;
}
.triste-container {
  position: absolute;
  top: 0;       
  margin-left: 200px;
  width: 100%;
  
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
  pointer-events: none;
  position: absolute;
  width: 80px;
  height: auto;
  transition: left 0.20s ease, top 0.20s ease;
  
  z-index: 999;
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
