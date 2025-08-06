<template>
  <div class="minijuego">
    <h1>Nivel Alfabeto</h1>
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
</template>

<script setup>
import confetti from 'canvas-confetti'
import { ref } from 'vue'

const letters = [
  {
    letter: 'A',
    correct: { name: 'Árbol', src: '/img/arbol.png' },
    wrong: [
      { name: 'Perro', src: '/img/perro.png' },
      { name: 'Coche', src: '/img/coche.png' }
    ],
    
  },
   {
    letter: 'B',
    correct: { name: 'Baño', src: '/img/baño.png' },
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
  
]

const round = ref(0)
const currentLetter = ref(letters[round.value].letter)
const currentOptions = ref(shuffle([
  letters[round.value].correct,
  ...letters[round.value].wrong
]))

const showNext = ref(false)

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
  } else {
    const utter = new SpeechSynthesisUtterance('no, inténtalo de nuevo')
    window.speechSynthesis.speak(utter)
  }
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
.minijuego {
    margin-top: 100px;
  text-align: center;
  padding: 2rem;
}
.letra {
  font-size: 4rem;
  color: darkcyan;
}
.imagenes {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
}
.imagen {
  border: 2px solid #ccc;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.3s;
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
  background-color: darkcyan;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}
</style>
