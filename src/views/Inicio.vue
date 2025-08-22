<template>
  <div class="home-container">
    <h1> Tren del Aprendizaje</h1>
 <div class="tren-container">
    <div class="train">
      <div class="locomotive">🚂</div>
      <div class="smoke"></div>
      <div class="smoke"></div>
       <div class="smoke"></div>
       <div class="traffic-light">
  <div class="light red"></div>
  <div class="light yellow"></div>
  <div class="light green"></div>
</div>
 <div class="vagons">
        <div v-for="(vagon, index) in niveles" :key="index" class="vagon">
          {{ vagon.emoji }}
        </div>
      </div>
    </div>



<!--  <p class="nivel-text">Nivel actual: {{ niveles[nivelActual].nombre }}</p>

    <button class="start-button" @click="irAlNivelActual">
      👉 Primera parada Alfabeto
    </button>
 <div>
    
    <router-link to="/alfabeto">
     
    </router-link>
  </div>-->
  <!--  <div class="progreso">
  Progreso:
  <span v-for="n in totalParadas" :key="n" class="estrella">
    {{ n <= progreso ? '⭐' : '☆' }}
  </span>
</div>-->

    
  </div>


  <div class="inicio">
    
    <div class="mapa-tren">
    <div
  v-for="(parada, index) in paradas"
  :key="index"
  class="parada"
  :class="{ activa: index === paradaActual }"
  @click="irAParada(parada)"
>
  {{ parada.nombre }}
</div>

    </div>

  
   <!--  <div class="proxima-parada">
      <p>Próxima parada: <strong>{{ paradas[paradaActual] }}</strong></p>
    </div>

   

    
    <div class="controles">
      <button @click="anteriorParada" :disabled="paradaActual === 0">⬅️ Anterior</button>
      <button @click="siguienteParada" :disabled="paradaActual === paradas.length - 1">➡️ Siguiente</button>
    </div>-->

  </div>

  
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

import BotonProximaParada from '../components/BotonProximaParada.vue'



function irAParada(parada) {
  router.push(parada.ruta)
}

const paradas = ref([
  
  { nombre: '🔤 Alfabeto', ruta: '/alfabeto' },
  { nombre: '✏️ Dibujar letras', ruta: '/dibujar' },
  { nombre: '🖍️ Escribir palabras', ruta: '/escribir' },
  { nombre: '🧩 Puzzle', ruta: '/puzzle' },
  { nombre: '🎮 Encuentra la palabra', ruta: '/miniJuegoAlfabeto' },
  { nombre: '⭐ Desafío', ruta: '/desafio' },
  { nombre: '🎮 Copia la palabra', ruta: '/seleccionar' },
  { nombre: '🎁 Practicar y recompensas', ruta: '/practicar' },
  { nombre: '🏆Diploma', ruta: '/Diploma' }
])



const paradaActual = ref(0)
const siguienteParada = () => {
  if (paradaActual.value < paradas.value.length - 1) {
    paradaActual.value++
  }
}


const anteriorParada = () => {
  if (paradaActual.value > 0) {
    paradaActual.value--
  }
}
const progreso = ref(0)
const totalParadas = 9

function proximaParada() {
  if (progreso.value < totalParadas) {
    progreso.value++
    animarEstrellas()
  }
 
}


onMounted(() => {
  setInterval(() => {
    if (paradaActual.value < paradas.value.length - 1) {
      paradaActual.value++
    }
  }, 5000)
})

onMounted(() => {
  const utterance = new SpeechSynthesisUtterance("¡sube en el tren de las letras con tus amigos Robi y Leo y vamos a divertirnos y aprender el alfabeto!");
  utterance.lang = 'es-ES';
  utterance.pitch = 1;
  utterance.rate = 0.9;
  utterance.volume = 1;

  
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 1500);
});


const router = useRouter()


const niveles = [
  { nombre: 'Alfabeto', emoji: '🔤', ruta: './alfabeto' },
  { nombre: 'Dibujar letras', emoji: '✏️', ruta: './dibujar' },
  { nombre: 'Escribir palabras', emoji: '📚', ruta: './escribir' },
  { nombre: 'Puzzle', emoji: '🧩', ruta: './puzzle' },
  { nombre: 'Encuentra la letra', emoji: '🧩', ruta: './miniJuegoAlfabeto' },
  { nombre: 'Desafio', emoji: '🧩', ruta: '/nivel-desafio' },
  { nombre: 'Copia la palabra', emoji: '🧩', ruta: './seleccionar' },
  { nombre: 'Practicar y recompensas', emoji: '🎁', ruta: '/nivel-practicar' }
]


const nivelActual = ref(0)


function irAlNivelActual() {
  const ruta = niveles[nivelActual.value].ruta
  router.push(ruta)
}

</script>

<style scoped>
.home-container {
  margin-top: 40px;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff, #ceefff);
  padding: 1rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;margin-bottom: 10px;color: rgb(9, 107, 107);
  
}
.h1 {
color: darkcyan;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(35, 160, 218, 0.459);
}


.locomotive {
  font-size: 4rem;
  margin-right: 10px;
}

.vagons {
  display: flex;
}

.vagon {
  font-size: 3.5rem;
  margin: 0 5px;
}

.train {
  position: absolute;
  top: 35rem;
  font-size: 3rem;
  display: flex;
  align-items: center;
  animation: moveTrain 10s linear infinite;
}
.smoke {
  position: absolute;
  top: -30px;
  left: 0;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #b10a34, transparent);
  border-radius: 50%;
  opacity: 0.7;
  animation: puff 1.5s ease-in-out infinite;
}
.traffic-light {
  position: absolute;
  left: -70px;
  bottom: 0px;
  width: 30px;
  background: #222;
  border: 2px solid #444;
  padding: 5px;
  border-radius: 10px;
}

.light {
  width: 20px;
  height: 20px;
  margin: 5px auto;
  border-radius: 50%;
  opacity: 0.3;
}

.red {
  background: red;
  animation: redLight 6s infinite;
}
.yellow {
  background: yellow;
  animation: yellowLight 6s infinite;
}
.green {
  background: limegreen;
  animation: greenLight 6s infinite;
}

@keyframes redLight {
  0%, 100% { opacity: 1; }
  33%, 66% { opacity: 0.3; }
}
@keyframes yellowLight {
  0%, 33% { opacity: 0.3; }
  34%, 66% { opacity: 1; }
  67%, 100% { opacity: 0.3; }
}
@keyframes greenLight {
  0%, 66% { opacity: 0.3; }
  67%, 100% { opacity: 1; }
}


@keyframes puff {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-10px, -30px) scale(1.5);
    opacity: 0.4;
  }
  100% {
    transform: translate(-20px, -60px) scale(2);
    opacity: 0;
  }
}



@keyframes moveTrain {
  0% {
    right: -90%;
  }
  100% {
    right: 100%;
  }
}


.progreso {
  margin-top: 16rem;
  font-size: 1.2rem;
}
.inicio {
  text-align: center;
  font-family: sans-serif;
  padding: 20px;
}
.mapa-tren {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; 
  gap: 10px;
  top:5rem;
  margin-bottom: 500px;
}

.parada {
  padding: 8px 12px;
  border-radius: 8px;
  background: linear-gradient(145deg, #ffffffff, #ffffff);
  transition: background 0.3s, transform 0.3s;
  box-shadow: 5px 7px 5px rgba(2, 38, 85, 0.5);
  min-width: 120px; 
  height: auto;
  text-align: center;
  cursor: pointer;
  color: darkcyan;
  font-weight: bold;
  text-shadow:#051f4e;
  
}

.parada:hover {
  transform: scale(1.05); 
}

.parada.activa {
  background: darkcyan;
  color: white;
  font-weight: bold;
}

@media (max-width: 768px) {
  .train {
    top: 18rem;  
    font-size: 2.2rem;
  }

  .progreso {
    margin-top: 8rem; 
    font-size: 1rem;
  }

  .mapa-tren {
    margin-bottom: 200px; 
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .train {
    top: 14rem;  
    font-size: 2rem;
  }

  .progreso {
    margin-top: 6rem;
  }

  .mapa-tren {
    margin-bottom: 120px;
  }
}
@media (max-width: 768px) {
  .parada {
    padding: 6px 10px;
    min-width: 100px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .parada {
    padding: 4px 8px;
    min-width: 80px;
    font-size: 0.8rem;
  }
}



.proxima-parada {
  background: linear-gradient(45deg, #2703f3f6, #e8e8ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(35, 160, 218, 0.459);

  margin-bottom: 10px;
}



.controles button {
  padding: 8px 14px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  background: darkcyan;
  color: white;
  cursor: pointer;
}

.controles button:disabled {
  background: #e08d3fe5;
  cursor: not-allowed;
}
.estrella-cayendo {
  pointer-events: none;
}
@media (max-width: 768px) {
  .parada { padding: 0.4rem 0.8rem; min-width: 5rem; font-size: 0.9rem; }
  .train { bottom: 20%; font-size: clamp(1.5rem, 5vw, 2.5rem); }
  .traffic-light { left: -7%; bottom: 7%; }
}

@media (max-width: 480px) {
  .parada { padding: 0.3rem 0.6rem; min-width: 4rem; font-size: 0.8rem; }
  .train { bottom: 25%; font-size: clamp(1.2rem, 4vw, 2rem); }
  .traffic-light { left: -10%; bottom: 10%; width: 25px; }
}
</style>