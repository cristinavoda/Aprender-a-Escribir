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
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Referencia from './Referencia.vue'
import Escribir from './Escribir.vue'
import { defineEmits } from 'vue'
import Teclado from '../components/Teclado.vue'

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
</style>
