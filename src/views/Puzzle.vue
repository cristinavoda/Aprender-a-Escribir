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
  
  <button v-if="isCorrect" class="next-btn" @click="nextWord">
      👉 Siguiente
    </button>
    </div>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue'
import confetti from 'canvas-confetti'


const words = ref(['TREN','ROBERT','MOVIL','KINDER','CASA','AGUA','COMER','CANSADO','PASEO','CAMA','MOVIL','AURICULARES', 'AVION', 'BARCO', 'GATO', 'PERRO','LECHE','MANZANA']); 
let currentIndex = ref(0) 

const targetWord = ref(words.value[currentIndex.value]) 
const scrambled = ref([])

const userSelection = ref([])
const resultMessage = ref('')
const isCorrect = ref(false)
const selected = ref([])  

let positions = []

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function generarPosiciones() {
  positions = currentWord.value.split('').map(() => ({
    top: Math.random() * 200 + 'px',
    left: Math.random() * 2000 + '%'
  }))
}

function getRandomStyle(index) {
  return {
    top: positions[index].top,
    left: positions[index].left
  }
}

onMounted(() => {
  const letters = targetWord.value.split('')
  scrambled.value = shuffle(letters)
  userSelection.value = Array(letters.length).fill('')
})


function selectLetter(index) {
  const letter = scrambled.value[index]

  
  if (!selected.value.includes(index)) {
    const pos = userSelection.value.indexOf('')
    if (pos !== -1) {
      userSelection.value[pos] = letter
      selected.value.push(index) 
    }
  }
}


function checkAnswer() {
  const attempt = userSelection.value.join('')
  if (attempt === targetWord.value) {
    resultMessage.value = '¡Correcto! 🎉'
    isCorrect.value = true
    triggerConfetti() 
     speakWord(targetWord.value);
  } else {
    resultMessage.value = 'Incorrecto, inténtalo de nuevo.'
    isCorrect.value = false

    userSelection.value = Array(targetWord.value.length).fill('')
    selected.value = [] 
  }
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'es-ES';
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}



function nextWord() {
  
  currentIndex.value = Math.floor(Math.random() * words.value.length)
  targetWord.value = words.value[currentIndex.value]
  
  scrambled.value = shuffle(targetWord.value.split(''))
  userSelection.value = Array(targetWord.value.length).fill('')
  selected.value = []
  resultMessage.value = ''
  isCorrect.value = false
  

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
</script>

<style scoped>

h2 {background: linear-gradient(45deg, #2703f3f6, #e8e8ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(55, 131, 218, 0.459);
}

.puzzle-view {
  display: flex;
  flex-direction: column;
  gap: 1rem; 
  text-align: center;
  max-width: 600px;
  margin:auto;
  padding: 1.5rem;
  text-align: center;
}

.scrambled-letters {
  margin: 1rem 0;
   font-size: 3.5rem;
   color: #2609ac69;
  
}

.scramble-key {
  font-size: 3.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  color: #1026f0c7;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);

}

.selected-letters {
  margin-top: 1rem;
}

.selected-key {
  font-size: 4rem;
  padding: 0.5rem;
  margin: 0.5rem;
  color: #0713c2cc;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 4px 4px 5px rgba(19, 16, 202, 0.842);

}

.check-btn {
  font-size: 1.2rem;
  width :150px;
  padding: 0.6rem 1.5rem;
  background-color: #008b8b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
   transform: scale(1.05);
   margin-left: 180px;
   
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
.next-btn {
   font-size: 1.2rem;
  width: 150px;
  padding: 0.6rem 1.5rem;
  background-color: #008b8b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: scale(1.05);
   margin-left: 180px;

}

</style>
