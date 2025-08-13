<template>
  <div class="home-container">
    <h1> Tren del Aprendizaje🚂🚃🚃🚃</h1>
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
    </div>




<!--  <p class="nivel-text">Nivel actual: {{ niveles[nivelActual].nombre }}</p>

    <button class="start-button" @click="irAlNivelActual">
      👉 Primera parada Alfabeto
    </button>
 <div>
    
    <router-link to="/alfabeto">
     
    </router-link>
  </div>-->
    <div class="progreso">
      Progreso:
      <span v-for="n in 5" :key="n">
        {{ n <= nivelActual + 1 ? '⭐' : '☆' }}
      </span>
    </div>
    
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
         {{ parada }}
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
  { nombre: '🏢 Estación Central', ruta: '/' },
  { nombre: '🔤 Alfabeto', ruta: '/alfabeto' },
  { nombre: '✏️ Dibujar letras', ruta: '/dibujar' },
  { nombre: '🖍️ Escribir palabras', ruta: '/escribir' },
  { nombre: '🧩 Puzzle', ruta: '/puzzle' },
  { nombre: '🎮 Juego', ruta: '/juego' },
  { nombre: '⭐ Desafío', ruta: '/desafio' },
  { nombre: '🎁 Practicar y recompensas', ruta: '/practicar' }
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
  { nombre: 'Escribir palabras', emoji: '📚', ruta: '/nivel-escribir' },
  { nombre: 'Puzzle', emoji: '🧩', ruta: '/nivel-puzzle' },
  { nombre: 'Juego', emoji: '🧩', ruta: '/nivel-juego' },
  { nombre: 'Desafio', emoji: '🧩', ruta: '/nivel-desafio' },
  

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
  margin-top: 20px;
  text-align: center;
  background: linear-gradient(to bottom, #ccefff, #ffffff);
  padding: 1rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  
}
.p {
    background: linear-gradient(45deg, #2703f3f6, #e8e8ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(35, 160, 218, 0.459);
}

.train {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
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
.train-container {
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
  margin-top: 30px;
  margin-left: 10px;
}

.train-track {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: repeating-linear-gradient(
    to right,
    #da920c86 0 5px,
    #eee 5px 10px
  );
}
.tren-container{
  top: 40px;
}
.train {
  position: absolute;
  bottom: 0px;
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


.wagon {
  margin-left: 5px;
}

@keyframes moveTrain {
  0% {
    right: -90%;
  }
  100% {
    right: 100%;
  }
}

.start-button {
  margin-top: 0,5rem;
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #ffa726;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}

.start-button:hover {
  background-color: #fb8c00;
}
.home-container
.buton {margin-top: 1rem;
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #ffa726;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);}
.progreso {
  margin-top: 1rem;
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
  gap: 10px;
  margin-bottom: 15px;
}

.parada {
  padding: 8px 12px;
  border-radius: 8px;
  background: linear-gradient(145deg, #f8f9fa, #f1f7f8);
  transition: background 0.3s;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.432);
}

.parada.activa {
  background: darkcyan;
  color: white;
  font-weight: bold;
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
</style>
