<template>
  <div class="practicar-container">
    
    <div class="sidebar">
      <h2>Historial de aciertos</h2>
      <ul>
        <li v-for="(item, idx) in history" :key="idx">
          {{ item.word }} ✅
        </li>
      </ul>
      <div class="rewards">
        <h4>⭐ Estrellas ganadas: {{ estrellas }}</h4>
      </div>
    </div>

    
    <div class="main">
      <h2>Palabra guía: <span class="palabra-guia">{{ palabraActual }}</span></h2>

     <div class="acciones"> 
  <input v-model="word" type="text" class="word-input" placeholder="Escribe la palabra" />
  <button class="btn" @click="deleteLetter">Borrar ⌫</button>
  <button class="btn" @click="checkInput">Comprobar ✔️</button>
  <button class="btn" @click="speak(palabraActual)">🔊 Escuchar palabra</button>
</div>


      <p class="mensaje">{{ mensaje }}</p>

      <div class="teclado">
        <Teclado @input="agregarLetra" />
      </div>
    </div>
  </div>
  
<div v-if="showConfetti" class="confetti-container">
  <div v-for="n in 50" :key="n" class="confetti"></div>
  <p class="mensaje">{{ mensaje }}</p>
</div>
<BotonProximaParada nombre="Diploma" ruta="/diploma" />

     

    <div class="train-container">
  <div class="train-track">
    <div class="train">
       <div class="smoke"></div>
      🚂 <span class="wagon">🚃</span><span class="wagon">🚃</span><span class="wagon">🚃</span><span class="wagon">🚃</span>
    </div>
  </div>
  
</div>
  
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Teclado from '../components/Teclado.vue'
import BotonProximaParada from '../components/BotonProximaParada.vue'
const respuesta = ref('')
const emit = defineEmits(['cambiarEstadoPersonaje'])

const palabras = [
  'GATO', 'PERRO', 'CASA', 'SOL', 'LUNA',
  'ARBOL', 'AGUA', 'NUBE', 'COCHE', 'ESTRELLA'
]

const nivel = ref(0)
const palabraActual = computed(() => palabras[nivel.value])
const word = ref('')
const mensaje = ref('')
const history = ref([])
const estrellas = ref(0)

function speak(text) {
  if (!text) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES' 
  speechSynthesis.speak(utterance)
}


watch(nivel, (newVal) => {
  speak(palabraActual.value)
})
function normalize(str) {
  return str.toUpperCase().trim()
}

function agregarLetra(letra) {
  if (letra === 'BORRAR') word.value = word.value.slice(0, -1)
  else word.value += letra
}

function deleteLetter() {
  word.value = word.value.slice(0, -1)
}

function confettiStyle(n) {
  const left = Math.random() * 100 + 'vw'
  const hue = Math.floor(Math.random() * 360)
  const duration = (Math.random() * 2 + 2) + 's'
  return {
    left,
    backgroundColor: `hsl(${hue}, 80%, 60%)`,
    animationDuration: duration
  }
}


function checkInput() {
  const respuesta = normalize(word.value)
  const correcta = normalize(palabraActual.value)

  if (respuesta === correcta) {
    mensaje.value = '¡Correcto! 🎉'
    showConfetti.value = true
    speak(correcta)
    emit('cambiarEstadoPersonaje', 'feliz')

    if (!history.value.includes(correcta)) {
      history.value.push(correcta)
      estrellas.value++
    }

    word.value = ''

    if (nivel.value < palabras.length - 1) nivel.value++
    else mensaje.value = '¡Felicidades! 🏆 Todos los niveles completados'

    setTimeout(() => { showConfetti.value = false; mensaje.value = '' }, 2500)
  } else {
    mensaje.value = 'Intenta de nuevo ❌'
    speak('Intenta de nuevo')
     emit('cambiarEstadoPersonaje', 'triste')
    setTimeout(() => mensaje.value = '', 2000)
  }
}

function triggerConfetti() {
  confetti({
    particleCount: 600,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ff9900'],  
    ticks: 600
  })
}
onMounted(() => {
  const savedHist = localStorage.getItem('history')
  const savedStars = localStorage.getItem('estrellas')
  const savedNivel = localStorage.getItem('nivel')
  if (savedHist) history.value = JSON.parse(savedHist)
  if (savedStars) estrellas.value = parseInt(savedStars)
  if (savedNivel) nivel.value = parseInt(savedNivel)
})

watch(history, val => localStorage.setItem('history', JSON.stringify(val)), { deep: true })
watch(estrellas, val => localStorage.setItem('estrellas', val))
watch(nivel, val => localStorage.setItem('nivel', val))
const showConfetti = ref(false)

function celebrar() {
  showConfetti.value = true
  setTimeout(() => showConfetti.value = false, 5000) 
}


if (nivel.value === palabras.length - 1 && respuesta === correcta) {
  celebrar()
}
</script>

<style scoped>

.practicar-container { display: flex; gap: 2rem; }

.h3,h2,h4 {
  color: darkcyan
}
.sidebar { width: 200px; border-right: 2px solid #333; padding-right: 1rem; }
.sidebar ul { list-style: none; padding: 0;color: darkcyan }
.rewards { margin-top: 1rem; text-align: center; }
.main { flex: 1; text-align: center; }
.palabra-guia { font-weight: bold; font-size: 3rem; color: darkcyan; }
.word-input { padding: 0.5rem; font-size: 3rem; width: 150px; text-align: center; margin-top: 1rem; }
.acciones { margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem; }

.word-input {
  flex: 1; 
  min-width: 300px;
  height: 47px; 
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #0268dd; 
  background: linear-gradient(145deg,#0268dd, #d4d4d4);
  color: #ffffff;
  font-size: 1,2rem;
  text-align: center;
  box-shadow: 5px 2px 5px rgba(88, 8, 153, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.word-input:focus {
  outline: none;
  transform: scale(1.02);
  box-shadow: 5px 4px 10px rgba(88, 8, 153, 0.4);
}
.btn {
    border: none;
     
  padding: 0.75rem 1rem;
  margin: 0;
  background: linear-gradient(145deg,#0268dd, #d4d4d4);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 5px 2px 5px rgba(88, 8, 153, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 10px;
  color:#ffffff;

}
.mensaje { font-weight: bold; margin-top: 1rem; font-size: 1.2rem; }
.teclado { margin-top: 1rem; font-size: 2.2rem;}
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
}

.confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: hsl(calc(360 * var(--i)), 80%, 60%);
  top: -10px;
  left: calc(100% * var(--i));
  animation: caer 2s linear forwards;
}

@keyframes caer {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}
 .train-container {
    position: relative;
    width: 100%;
    height: 120px;
    overflow: hidden;
    margin-top: 60px;
    margin-left: 10px;
    border: none; 
  }
  .train-track {
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 30px;
    background: repeating-linear-gradient(
      to right,
      #c2e20a 0 5px,
      #eee 5px 10px
    );
  }
  .train {
    position: absolute;
    bottom: 10px;
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

  @keyframes moveTrain {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-200px);
    }
  }

  @keyframes puff {
    0% {
      transform: translateY(0) scale(0.5);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) scale(1);
      opacity: 0.3;
    }
    100% {
      transform: translateY(-40px) scale(0.5);
      opacity: 0;
    }
  }
</style>
