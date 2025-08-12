<template>
  <div class="practicar">
    
    <div class="sidebar">
      <h3>Historial de aciertos</h3>
      <ul>
        <li v-for="(item, idx) in history" :key="idx">
          {{ item.word }} ✅
        </li>
      </ul>
      <div class="rewards">
        <h4>⭐ Estrellas ganadas: {{ history.length }}</h4>
      </div>
    </div>

    
    <div class="main">
      
      <div v-if="selection.imageUrl" class="practice-area">
        <Referencia
          :image-url="selection.imageUrl"
          :word="selection.word"
          @updateWord="onUpdateWord"
        />

         <button @click="speakWord" class="speak-button">🔊 Escuchar palabra</button>

        <div class="keyboard">
          <h2>Copia la palabra: <span>{{ palabra }}</span></h2>
    <input v-model="texto" readonly />

    <Teclado @input="agregarLetra" />
     <button
        v-for="key in letters"
        :key="key"
        @click="addLetter(key)"
        class="key"
      >
        {{ key }}
      </button>
      <button @click="deleteLetter" class="key delete">⌫</button>


    </div>


        <Escribir
          :image-url="selection.imageUrl"
          :word="selection.word"
          @correct="onCorrect"
        />


      </div>
    </div>
     <div class="keyboard">
      <button
        v-for="key in letters"
        :key="key"
        @click="addLetter(key)"
        class="key"
      >
        {{ key }}
      </button>
      <button @click="deleteLetter" class="key delete">⌫</button>
    </div>
  </div>
  <BotonProximaParada nombre="Su destino" ruta="/practicar" />
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
import { ref, onMounted, watch } from 'vue'
import Referencia from './Referencia.vue'
import Escribir from './Escribir.vue'
import { defineEmits } from 'vue'
import Teclado from '../components/Teclado.vue'
import BotonProximaParada from '../components/BotonProximaParada.vue'


const emit = defineEmits(['input'])

const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

function escribir(letra) {
  emit('input', letra)
}

function borrar() {
  emit('input', 'BORRAR')
}
const props = defineProps(['word', 'imageUrl'])

const userInput = ref('')
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')


const selection = ref({ imageUrl: '', word: '' })


const history = ref([])

const speakWord = () => {
  const utterance = new SpeechSynthesisUtterance(props.word)
  utterance.lang = 'es-ES'
  speechSynthesis.speak(utterance)
}


onMounted(() => {
  const saved = localStorage.getItem('history')
  if (saved) history.value = JSON.parse(saved)
})


 watch(history, (newVal) => {
  localStorage.setItem('history', JSON.stringify(newVal))
}, { deep: true })

function onSelect(payload) {
  selection.value = payload
}

function onUpdateWord(newWord) {
  selection.value.word = newWord.toUpperCase()
}

function onCorrect(correctSelection) {
  
  if (!history.value.some(item => item.word === correctSelection.word)) {
    history.value.push({ ...correctSelection })
  }
}
</script>

<style scoped>
.practicar {
  display: flex;
  gap: 2rem;
}
.sidebar {
  width: 200px;
  border-right: 2px solid var(--color-text);
  padding-right: 1rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.rewards {
  margin-top: 1rem;
  text-align: center;
}
.main {
  flex: 1;
}
.practice-area {
  margin-top: 2rem;
}

.keyboard {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.key {
  font-size: 1.2rem;
  padding: 0.6rem;
  width: 45px;
  height: 45px;
  border: none;
  background-color: #dcdcdc;
  border-radius: 8px;
  cursor: pointer;
}

.delete {
  background-color: #ff7f7f;
}
.teclado {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.teclado button {
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 8px;
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
@media (max-width: 600px) {
  .practicar {
    flex-direction: column;
  }
  .sidebar {
    width: auto;
    border-right: none;
    border-bottom: 2px solid var(--color-text);
    padding-bottom: 1rem;
  }
}
@media (max-width: 768px) {
  .tecla {
    width: 60px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .tecla {
    width: 50px;
    height: 40px;
  }
}

</style>
