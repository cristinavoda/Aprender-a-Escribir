<template>
  <div class="puzzle-view">
    <h2>Puzzle: Ordena las letras</h2>
    <div class="scrambled-letters">
      <button
        v-for="(letter, index) in scrambled"
        :key="index"
        @click="selectLetter(index)"
        class="scramble-key"
        :disabled="selected.includes(index)"
      >
        {{ letter }}
      </button>
    </div>
    <div class="selected-letters">
      <span
        v-for="(letter, idx) in userSelection"
        :key="idx"
        class="selected-key"
      >
        {{ letter || '_' }}
      </span>
    </div>
    <button @click="checkAnswer" class="check-btn" :disabled="userSelection.includes('')">Comprobar</button>
    <p v-if="resultMessage" :class="{'correct': isCorrect, 'wrong': !isCorrect}">{{ resultMessage }}</p>
  </div>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue'
import confetti from 'canvas-confetti'


const words = ref(['TREN','CASA','AGUA','COMER','PASEO','CAMA','MOVIL','AURICULARES', 'AVION', 'BARCO', 'GATO', 'PERRO']); // Lista de palabras
let currentIndex = ref(0) // Índice de la palabra actual

const targetWord = ref(words.value[currentIndex.value])  // Palabra actual
const scrambled = ref([])

const userSelection = ref([])
const resultMessage = ref('')
const isCorrect = ref(false)
const selected = ref([])  // Para llevar el seguimiento de las letras seleccionadas

// Función para desordenar las letras
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

onMounted(() => {
  const letters = targetWord.value.split('')
  scrambled.value = shuffle(letters)
  userSelection.value = Array(letters.length).fill('')
})

// Función para seleccionar una letra
function selectLetter(index) {
  const letter = scrambled.value[index]

  // Verificar si la letra ya está seleccionada
  if (!selected.value.includes(index)) {
    const pos = userSelection.value.indexOf('')
    if (pos !== -1) {
      userSelection.value[pos] = letter
      selected.value.push(index) // Agregar el índice de la letra seleccionada
    }
  }
}

// Función para comprobar la respuesta
function checkAnswer() {
  const attempt = userSelection.value.join('')
  if (attempt === targetWord.value) {
    resultMessage.value = '¡Correcto! 🎉'
    isCorrect.value = true
    triggerConfetti()  // Llamar a la función para el confeti
  } else {
    resultMessage.value = 'Incorrecto, inténtalo de nuevo.'
    isCorrect.value = false
    selected.value = [] // Resetear las letras seleccionadas
    userSelection.value = Array(targetWord.value.length).fill('') // Resetear la selección
  }
}

function nextWord() {
  // Seleccionamos una palabra aleatoria
  currentIndex.value = Math.floor(Math.random() * words.value.length)
  targetWord.value = words.value[currentIndex.value]
  
  scrambled.value = shuffle(targetWord.value.split(''))
  userSelection.value = Array(targetWord.value.length).fill('')
  resultMessage.value = ''
  isCorrect.value = false
}
// Función para el confeti
function triggerConfetti() {
  confetti({
    particleCount: 600,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ff9900'],  // Colores del confeti
    ticks: 600
  })
}
</script>

<style scoped>
.puzzle-view {
  text-align: center;
}

.scrambled-letters {
  margin: 1rem 0;
}

.scramble-key {
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
}

.selected-letters {
  margin-top: 1rem;
}

.selected-key {
  font-size: 2rem;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #ddd;
  border-radius: 8px;
}

.check-btn {
  font-size: 1.2rem;
  padding: 0.6rem 1.5rem;
  background-color: #008b8b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.check-btn:disabled {
  background-color: #ccc;
}

.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>
