<template>
  <div class="minijuego">
    <h1>Encuentra la letra</h1>
    <h2 class="letra">{{ currentLetter }}</h2>

    <div class="imagenes">
      <div
        v-for="(img, index) in currentOptions"
        :key="index"
        class="imagen"
        @click="checkAnswer(img)"
      >
        <img :src="img.src" :alt="img.name" />
        <p>{{ img.name }}</p>
      </div>
    </div>

    <button @click="nextRound" v-if="showNext">Siguiente</button>
  </div>
   
  <div class="tren-progreso">
  <span>🚂</span>
 <span v-for="n in vagonesActivos" :key="n" class="vagon activo">🚃</span>

</div>
</template>


<script setup>
import confetti from 'canvas-confetti'
import { ref, onMounted } from 'vue'

const letters = [
  {
    letter: 'A',
    correct: { name: 'Árbol', src: './arbol.jpg' },
    wrong: [
      { name: 'Perro', src: './perro.jpg' },
      { name: 'Coche', src: './coche.jpg' }
    ],
    
  },
   {
    letter: 'B',
    correct: { name: 'Banco', src: '/img/banco.png' },
    wrong: [
      { name: 'Gato', src: '/img/gato.png' },
      { name: 'Agua', src: '/img/agua.png' }
    ],
    
  },
  {
    letter: 'C',
    correct: { name: 'Casa', src: '/img/casa.png' },
    wrong: [
      { name: 'Manzana', src: '/img/manzana.png' },
      { name: 'Tren', src: '/img/tren.png' }
    ],
    
  },
  {
    letter: 'D',
    correct: { name: 'Dedo', src: '/img/dedo.png' },
    wrong: [
      { name: 'Manzana', src: '/img/manzana.png' },
      { name: 'Tren', src: '/img/tren.png' }
    ],
    
  },
  {
    letter: 'E',
    correct: { name: 'Elefante', src: '/img/elefante.png' },
    wrong: [
      { name: 'Manzana', src: '/img/manzana.png' },
      { name: 'Tren', src: '/img/tren.png' }
    ],
    
  },
  
]

const round = ref(0)
const currentLetter = ref(letters[round.value].letter)
const currentOptions = ref(shuffle([
  letters[round.value].correct,
  ...letters[round.value].wrong
]))

const showNext = ref(false)
const emit = defineEmits(['cambiarEstadoPersonaje'])
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function checkAnswer(img) {
  const correct = letters[round.value].correct
  if (img.name === correct.name) {
    const synth = window.speechSynthesis
    const utter = new SpeechSynthesisUtterance('¡Muy bien!')
    synth.speak(utter)
    confetti()
    showNext.value = true
    addVagon()
    console.log("✅ Respuesta correcta, vagón añadido")
    emit('cambiarEstadoPersonaje', 'feliz')
  } else {
    const utter = new SpeechSynthesisUtterance('no, inténtalo de nuevo')
    window.speechSynthesis.speak(utter)
     emit('cambiarEstadoPersonaje', 'triste')
  }
}
const vagonesActivos = ref(0)
function acertarRespuesta() {
  vagonesActivos.value++
}
function addVagon() {
  vagonesActivos.value++
}
function nextRound() {
  round.value++
  if (round.value < letters.length) {
    currentLetter.value = letters[round.value].letter
    currentOptions.value = shuffle([
      letters[round.value].correct,
      ...letters[round.value].wrong
    ])
    showNext.value = false
  } else {
    const utter = new SpeechSynthesisUtterance('¡Has terminado el nivel!')
    window.speechSynthesis.speak(utter)
  }
}
</script>

<style scoped>
h1{background: linear-gradient(45deg, #2703f3f6, #e8e8ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(55, 131, 218, 0.459);
}


.minijuego {
    margin-top: -60px;
  text-align: center;
  padding: 2rem;
  
}
.letra {
  margin-top: -40px;
  font-size: 4rem;
  color: darkcyan;
  text-shadow: 6px 2px 2px rgba(18, 35, 82, 0.459);}

.imagenes {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0; background: #ffffff;
  border: transparent;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.imagen {
  border: 2px solid #c8bbf5;
  box-shadow: #285175;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.3s;
   box-shadow: 5px 5px 5px rgba(88, 8, 153, 0.2);
   
}
.imagen:hover {
  background-color: #f0f8ff;
}
img {
  max-width: 150px;
  max-height: 150px;
}
button {
  padding: 1rem 2rem;
  font-size: 1rem;
   background: linear-gradient(145deg, #0f8aa8, #d4d4d4);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 5px 2px 5px rgba(88, 8, 153, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}
.tren-progreso {
  margin-top: -1rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
}

.locomotora {
  animation: chuff 1s ease infinite;
}

@keyframes chuff {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.vagon {
  transform: scale(0.7);
  transition: transform 0.3s ease, opacity 0.3s;
}

.vagon.activo {
  transform: scale(1.1);
  opacity: 1;
  animation: rebote 0.3s ease;
}

@keyframes rebote {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.1); }
}
</style>
