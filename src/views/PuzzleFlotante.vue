<template>
  <div class="flotante-view">
    <h2>¡Atrapa las letras!</h2>

    
    <div class="flotantes">
      <button
        v-for="(letter, index) in floatingLetters"
        :key="index"
        class="letra-flotante"
        :style="getRandomStyle(index)"
        v-if="!selectedIndices.includes(index)"
        @click="handleLetterClick(letter, index)"
      >
        {{ letter }}
      </button>
    </div>

   
    <div class="zona-orden">
      <div
        v-for="(slot, i) in currentWord.length"
        :key="'slot-' + i"
        class="slot"
      >
        {{ userWord[i] || '_' }}
      </div>
    </div>

    <button class="check-btn" @click="checkWord" :disabled="userWord.includes('')">
      Comprobar
    </button>

    <p v-if="resultMessage" :class="{ correct: isCorrect, wrong: !isCorrect }">
      {{ resultMessage }}
    </p>

    <button v-if="isCorrect" class="next-btn" @click="cargarNuevaPalabra">
      👉 Siguiente
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'


const palabras = ['ROBERT','MAMA','AGUA','ESCUELA','CASA','PARQUE','COMER','DORMIR','PLAYA','AVIÓN', 'TREN', 'PERRO', 'CASA', 'AGUA',]
const currentIndex = ref(0)

const currentWord = ref(palabras[currentIndex.value])
const floatingLetters = ref([])
const userWord = ref([])
const selectedIndices = ref([])
const resultMessage = ref('')
const isCorrect = ref(false)
const targetWord = ref(words[currentIndex.value])
const scrambled = ref([])
let positions = []

onMounted(() => {
  scrambled.value = shuffle(targetWord.value.split(''))
  userWord.value = Array(targetWord.value.length).fill('')
})

function shuffle(array) {
  return array
    .map(val => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.val)
}
function generarPosiciones() {
  const minDist = 160 
  const posicionesGeneradas = []

  currentWord.value.split('').forEach(() => {
    let nueva
    let intentos = 0
    do {
      nueva = {
        top: Math.random() * 150 + 40,
        left: Math.random() * 80
      }
      intentos++
    } while (
      posicionesGeneradas.some(p =>
        Math.hypot(p.top - nueva.top, p.left - nueva.left) < minDist
      ) && intentos < 100
    )

    posicionesGeneradas.push(nueva)
  })

  positions = posicionesGeneradas.map(p => ({
    top: `${p.top}px`,
    left: `${p.left}%`
  }))
}


function getRandomStyle(index) {
  return {
    top: positions[index].top,
    left: positions[index].left
  }
}

function handleLetterClick(letter, index) {
  const pos = userWord.value.indexOf('')
  if (pos !== -1) {
    userWord.value[pos] = letter
    selectedIndices.value.push(index)
  }
}
function checkAnswer() {
  const attempt = userWord.value.join('')
  if (attempt === targetWord.value) {
    resultMessage.value = '¡Correcto! 🎉'
    isCorrect.value = true

   
    setTimeout(() => {
      nextWord()
    }, 2000)

  } else {
    resultMessage.value = 'Incorrecto, inténtalo de nuevo.'
    isCorrect.value = false

    
    userWord.value = Array(targetWord.value.length).fill('')
    selectedIndices.value = []

   
    setTimeout(() => {
      resultMessage.value = ''
    }, 2000)
  }
}

function checkWord() {
  const joined = userWord.value.join('')
  if (joined === currentWord.value) {
    resultMessage.value = '¡Bravo! 🎉 Palabra correcta.'
    isCorrect.value = true
  } else {
    resultMessage.value = 'No es correcto. Inténtalo de nuevo.'
    isCorrect.value = false
    
  }
}

function triggerConfetti() {
  confetti({
    particleCount: 600,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ff9900'],  
    ticks: 600
  })}

function cargarNuevaPalabra() {
  currentIndex.value = (currentIndex.value + 1) % words.length
  targetWord.value = words[currentIndex.value]
  scrambled.value = shuffle(targetWord.value.split(''))
  userWord.value = Array(targetWord.value.length).fill('')
  selectedIndices.value = []
  resultMessage.value = ''
  isCorrect.value = false
}

// Inicializar
cargarNuevaPalabra()
</script>

<style scoped>
.flotante-view {
  text-align: center;
  position: relative;
  min-height: 400px;
  padding: 1rem;
}

.flotantes {
  position: relative;
  height: 250px;
}
.scrambled-letters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.scramble-key {
  background-color: #4ecdc4;
  color: white;
  font-size: 24px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  animation: float 2s infinite ease-in-out;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.scramble-key:disabled {
  opacity: 0.3;
  cursor: default;
  animation: none;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.selected-letters {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.selected-key {
  font-size: 28px;
  padding: 10px;
  border-bottom: 2px solid #aaa;
  min-width: 30px;
  text-align: center;
  transition: transform 0.3s ease;
}
.scrambled-letters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.scramble-key {
  background-color: #4ecdc4;
  color: white;
  font-size: 24px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  animation: float 2s infinite ease-in-out;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.scramble-key:disabled {
  opacity: 0.3;
  cursor: default;
  animation: none;
}

.letra-flotante {
  position: absolute;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  background: #3587be;
  color: white;
  border: none;
  border-radius: 12px;
  animation: rebote 1s infinite alternate;
  transition: transform 0.3s;
}

.letra-flotante:hover {
  transform: scale(1.2) rotate(-5deg);
}

@keyframes rebote {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-25px) rotate(2deg); }
   50% {
    transform: translateY(-10px);
  }
}



.zona-orden {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.slot {
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.correct {
  color: green;
  font-weight: bold;
}
.wrong {
  color: red;
}
.next-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
