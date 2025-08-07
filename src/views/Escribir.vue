<template>
  <div class="escribir-view">
    <h2>Aprender a Escribir</h2>

    <!-- Palabras sugeridas -->
    <div class="palabras-sugeridas">
      <button
        v-for="(p, i) in palabras"
        :key="i"
        @click="elegirPalabra(p)"
      >
        {{ p }}
      </button>
    </div>

    <!-- Feedback -->
   
 <div class="letter-feedback">
      <span
        v-for="(letter, index) in word"
        :key="index"
        :class="{
          correct: userInput[index] === letter,
          incorrect: userInput[index] && userInput[index] !== letter,
        }"
      >
        {{ userInput[index] || '_' }}
      </span>
    </div>

    <!-- Teclado -->
    <div class="teclado">
      <button v-for="(l, i) in letras" :key="i" @click="addLetter(l)">
        {{ l }}
      </button>
    </div>

    <!-- Acciones -->
    <div class="acciones">
      <button @click="deleteLetter">Borrar</button>
      <button @click="checkInput">Comprobar</button>
    </div>

    <p class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import confetti from 'canvas-confetti'

const palabras = ['SI','NO','QUIERO','ALFABETO','MUSICA','COMER','ENFERMO','ENFADADO','GATO', 'PERRO', 'CASA', 'NUBE','TREN','ROBERT','MOVIL','KINDER','CASA','AGUA','COMER','CANSADO','PASEO','CAMA','MOVIL','AURICULARES', 'AVION', 'BARCO', 'GATO', 'PERRO','LECHE','MANZANA']


const word = ref('gato')

const mensaje = ref('')
const palabraSugerida = ref('AGUA') 
const userInput = ref('') 



const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')


function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES'
  utterance.rate = 0.9
  utterance.pitch = 1
  speechSynthesis.speak(utterance)
}


function elegirPalabra(palabra) {
  word.value = palabra
  userInput.value = ''
  mensaje.value = ''
  speak(palabra)
}


function addLetter(letter) {
  if (userInput.value.length < word.value.length) {
    userInput.value += letter
  }
}


function deleteLetter() {
  userInput.value = userInput.value.slice(0, -1)
}


function checkInput() {
  if (userInput.value === word.value) {
    mensaje.value = '¡Correcto! 🎉'
    speak('¡Correcto!')
  } else {
    mensaje.value = 'Intenta de nuevo.'
    speak('Intenta de nuevo')
  }
}
</script>

<style scoped>
h2 {
  background: linear-gradient(45deg, #2703f3f6, #e8e8ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(55, 131, 218, 0.459);
  margin-top: 100px;
}

.escribir-view {
  max-width: 500px;
  margin: -60px;
  text-align: center;
  font-family: sans-serif;
}
.palabras-sugeridas button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #eaeaf3cb;
  color: blue;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 5px 4px 5px rgba(63, 44, 173, 0.678);

}
.letter-feedback {
  margin: 2rem 0;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: #0e008b;
  text-shadow: 2px 2px #80deea, 4px 4px rgba(0, 0, 0, 0.2);
}
.correct {
  color: rgb(8, 105, 100);
}
.incorrect {
  color: red;
}
.teclado {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 3px 1px; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 10px;
}
 @media (min-width: 768px) {
  .teclado {
    grid-template-columns: repeat(7, 1fr);
  }}
.teclado button {
  font-size: 3.2rem;
  padding: 0.4rem;
  color: blue;
  width: 95px;
  height: 65px;
  border-color:#87cbe2;
  background-color: #d9d8f065;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
  
}

.delete {
  background-color: #f0d8d8;
}


.acciones button {
  margin: 1rem 0.5rem;
  padding: 0.6rem 1.5rem;
  background: #008b8b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.mensaje {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
