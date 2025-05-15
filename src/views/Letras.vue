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


const palabras = ['AVIÓN', 'TREN', 'PERRO','SOL', 'COMER','ROBERT', 'CASA', 'AGUA']
const currentIndex = ref(0)
const userSelection = ref([])
const currentWord = ref(palabras[currentIndex.value])
const floatingLetters = ref([])
const userWord = ref([])
const selectedIndices = ref([])
const resultMessage = ref('')
const isCorrect = ref(false)

let positions = []

function shuffle(array) {
  return array
    .map(val => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.val)
}

function generarPosiciones() {
  positions = currentWord.value.split('').map(() => ({
    top: Math.random() * 200 + 'px',
    left: Math.random() * 200 + '2%'
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

function checkWord() {
  const joined = userWord.value.join('')
  if (joined === currentWord.value) {
    resultMessage.value = '¡Bravo! 🎉 Palabra correcta.'
    isCorrect.value = true
  } else {
    resultMessage.value = 'No es correcto. Inténtalo de nuevo.'
    isCorrect.value = false

   
    userWord.value = []   
  }
}

function cargarNuevaPalabra() {
  currentIndex.value = (currentIndex.value + 1) % palabras.length
  currentWord.value = palabras[currentIndex.value]
  floatingLetters.value = shuffle([...currentWord.value])
  userWord.value = Array(currentWord.value.length).fill('')
  selectedIndices.value = []
  resultMessage.value = ''
  isCorrect.value = false
  generarPosiciones()
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

.letra-flotante {
  position:absolute;
  padding: 1rem;
  font-size: 2rem;
  cursor: pointer;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  animation: flotar 2s infinite ease-in-out;
}

@keyframes flotar {
  0% { transform: translateY(13px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(15px); }
}

.zona-orden {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.slot {
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  border: 2px dashed #0b0eb3;
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
