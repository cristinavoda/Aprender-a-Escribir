<template>
  <div class="home-container">
    <h1>🚂 Tren del Aprendizaje</h1>

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
<div class="train-container">
  <div class="train-track">
    <div class="train">
      🚂 <span class="wagon">🚃</span><span class="wagon">🚃</span><span class="wagon">🚃</span>
    </div>
  </div>
</div>

    <p class="nivel-text">Nivel actual: {{ niveles[nivelActual].nombre }}</p>

    <button class="start-button" @click="irAlNivelActual">
      👉 Entrar al Nivel Actual
    </button>
 <div>
    <h1>🎮 Bienvenido a la app</h1>
    <router-link to="/alfabeto">
      <button>🚂 Empezar Nivel Alfabeto</button>
    </router-link>
  </div>
    <div class="progreso">
      Progreso:
      <span v-for="n in 5" :key="n">
        {{ n <= nivelActual + 1 ? '⭐' : '☆' }}
      </span>
    </div>
     <button @click="$emit('accionUsuario', 'izquierda')">Mover a la izquierda</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  const utterance = new SpeechSynthesisUtterance("¡sube en el tren de las letras!");
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
  { nombre: 'Alfabeto', emoji: '🔤', ruta: '/nivel-alfabeto' },
  { nombre: 'Dibujar letras', emoji: '✏️', ruta: '/nivel-dibujar' },
  { nombre: 'Escribir palabras', emoji: '📚', ruta: '/nivel-escribir' },
  { nombre: 'Puzzle', emoji: '🧩', ruta: '/nivel-puzzle' },
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
  margin-top: 100px;
  text-align: center;
  background: linear-gradient(to bottom, #ccefff, #ffffff);
  padding: 2rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 100vh;
}

.train {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.locomotive {
  font-size: 3rem;
  margin-right: 10px;
}

.vagons {
  display: flex;
}

.vagon {
  font-size: 2.5rem;
  margin: 0 5px;
}
.train-container {
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
  margin-top: 40px;
}

.train-track {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: repeating-linear-gradient(
    to right,
    #333 0 5px,
    #eee 5px 10px
  );
}

.train {
  position: absolute;
  bottom: 30px;
  font-size: 2rem;
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
    left: -30%;
  }
  100% {
    left: 100%;
  }
}

.start-button {
  margin-top: 1.5rem;
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

.progreso {
  margin-top: 1rem;
  font-size: 1.2rem;
}
</style>
