<template>
  <div class="puzzle-view">
    <h2> Ordena las letras</h2>
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
const respuesta = ref('')
const emit = defineEmits(['cambiarEstadoPersonaje'])

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
      emit('cambiarEstadoPersonaje', 'feliz')
  } else {
    resultMessage.value = 'Incorrecto, inténtalo de nuevo.'
    isCorrect.value = false

    userSelection.value = Array(targetWord.value.length).fill('')
    selected.value = [] 
    emit('cambiarEstadoPersonaje', 'triste')

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

h2 {
  background: linear-gradient(45deg, #2703f3f6, #e8e8ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
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
  background-color: #146e6e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
   transform: scale(1.05);
   margin-left: 180px;
   
}

.check-btn:disabled {
  background-color: linear-gradient(145deg, #0f8aa8, #d4d4d4);
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

.train-container {
    position: relative;
    width: 100%;
    height: 120px;
    overflow: hidden;
    margin-top: 30px;
    margin-left: 30px;
    border: 1px solid #ccc; /* para visualizar */
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

  @keyframes moveTrain {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-200px);
    }
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



.personaje-feliz{
  margin-top: 100px;
}

.personaje.triste img {
  
   margin-top: 10px;
  animation: encoger 1s ease-in-out;
}




  

@keyframes chuff {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
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

.vagon {
  transform: scale(0.7);
  transition: transform 0.3s ease, opacity 0.3s;
}

.vagon.activo {
  transform: scale(1.1);
  opacity: 1;
}
</style>