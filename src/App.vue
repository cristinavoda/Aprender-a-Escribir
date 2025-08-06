<template>
  <div id="app" @mousemove="moverConRaton">
    <AppNavbar />
    <RouterView @accionUsuario="moverPersonaje" />

    <!-- Personaje que sigue el ratón -->
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
  <img
    v-else
    src="./assets/personaje-normal.png"
    alt="normal"
  />
</div>

    <!-- Tren -->
    <div class="train-container">
      <div class="train" @animationend="onTrainStop">
        🚂
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from './components/AppNavbar.vue'

const x = ref(100)
const y = ref(100)

function moverConRaton(event) {
  x.value = event.clientX
  y.value = event.clientY
}
const estadoPersonaje = ref("normal"); // otros valores: "feliz", "triste", "sorprendido"
function reaccionar(segunResultado) {
  if (segunResultado === "correcto") {
    estadoPersonaje.value = "feliz";
  } else if (segunResultado === "incorrecto") {
    estadoPersonaje.value = "triste";
  }

  // Volver a estado normal después de 2 segundos
  setTimeout(() => {
    estadoPersonaje.value = "normal";
  }, 2000);
}

function moverPersonaje(accion) {
  console.log("El niño ha tocado:", accion)
  if (respuestaEsCorrecta) {
  personaje.estado = 'feliz'; // Cambia la animación o imagen del personaje
  mostrarMensaje("¡Muy bien!");
}
if (!respuestaEsCorrecta) {
  personaje.estado = 'triste';
  mostrarMensaje("¡Inténtalo otra vez!");
}


  // También podrías mover el personaje hacia un botón si quieres
}
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
  width: 120px;
  height: auto;
  transition: left 0.1s ease, top 0.1s ease;
  pointer-events: none;
  z-index: 999;
}

.train-container {
  width: 100%;
  height: 190px;
  overflow: hidden;
  position: relative;
  background-color: transparent;
  border-bottom: 1px solid #3d3fc0;
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

</style>
