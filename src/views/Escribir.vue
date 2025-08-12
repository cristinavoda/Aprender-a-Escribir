<template>
  <div class="escribir-view">
    

    
    <div class="palabras-sugeridas">
      <button
        v-for="(p, i) in palabras"
        :key="i"
        @click="elegirPalabra(p)"
      >
        {{ p }}
      </button>
    </div>

    
   
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

   <BotonProximaParada nombre="Puzzle" ruta="/puzzle" /> 
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
import { ref, watch, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import BotonProximaParada from '../components/BotonProximaParada.vue'
const palabras = ['SI','NO','QUIERO','ALFABETO','MUSICA','COMER','ENFERMO','ENFADADO','GATO', 'PERRO', 'CASA', 'NUBE','TREN','ROBERT','MOVIL','KINDER','CASA','AGUA','COMER','CANSADO','PASEO','CAMA','MOVIL','AURICULARES', 'AVION', 'BARCO', 'GATO', 'PERRO','LECHE','MANZANA']


const word = ref('gato')

const mensaje = ref('')
const palabraSugerida = ref('AGUA') 
const userInput = ref('') 



const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
const emit = defineEmits(['cambiarEstadoPersonaje'])

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
     emit('cambiarEstadoPersonaje', 'feliz')
  } else {
    mensaje.value = 'Intenta de nuevo.'
    speak('Intenta de nuevo')
    emit('cambiarEstadoPersonaje', 'triste')
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
  margin-top: 60px;
  text-align: center;
  font-family: sans-serif;
}
.palabras-sugeridas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  width: 100%;
  margin-top: 100px;
}
.palabras-sugeridas button {
  
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
  gap: 3px;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
}

.teclado button {
  font-size: 2.2rem;
  padding: 0.4rem;
  color: blue;
  font-weight: bold;
  text-shadow: 2px 2px #80deea, 4px 4px rgba(0, 0, 0, 0.2);
  width: 12vw;
  height: 8vw;
  max-width: 95px;
  max-height: 65px;
  border: 2px solid #87cbe2;
  background-color: #d9d8f065;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
}

 .train-container {
    position: relative;
    width: 100%;
    height: 120px;
    overflow: hidden;
    margin-top: 30px;
    margin-left: 10px;
    border: 1px solid #ccc; 
  }
  .train-track {
    position: absolute;
    bottom: 0;
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
@media (max-width: 768px) {
  .teclado button {
    width: 60px;
    height: 45px;
  }
}


@media (max-width: 600px) {
  .teclado {
    grid-template-columns: repeat(5, 1fr);
  }
  .teclado button {
    width: 55px;
    height: 40px;
    font-size: 1.8rem;
  }
  
}


@media (max-width: 480px) {
  .teclado button {
    width: 50px;
    height: 38px;
    font-size: 1.6rem;
  }
}

 @media (min-width: 768px) {
  .teclado {
    grid-template-columns: repeat(7, 1fr);
  }}

.delete {
  background-color: #f0d8d8;
}


.acciones button {
  margin: 1rem 0.5rem;
  padding: 0.6rem 1.5rem;
  background: #008b8b;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.mensaje {
  font-size: 2.2rem;
  font-weight: bold;
}

@media (max-width: 600px) {
  .palabras-sugeridas {
    grid-template-columns: repeat(auto-fit)}}
</style>
