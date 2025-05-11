<template>
  <div class="writing-view">
    <h2>Escribe la palabra</h2>

    <!-- Imagen -->
    <img :src="imageUrl" class="image" />

    <!-- Botón para escuchar la palabra -->
    <button @click="speakWord" class="speak-button">🔊 Escuchar palabra</button>

    <!-- Input para escribir -->
    <div class="input-container">
      <input
        v-model="userInput"
        @input="checkInput"
        type="text"
        class="word-input"
        placeholder="Escribe aquí..."
      />
    </div>

    <!-- Feedback letra por letra -->
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

    <!-- Teclado en pantalla -->
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
import { ref, onMounted } from 'vue'

const props = defineProps(['word', 'imageUrl'])

const userInput = ref('')
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

const speakWord = () => {
  const utterance = new SpeechSynthesisUtterance(props.word)
  utterance.lang = 'es-ES'
  speechSynthesis.speak(utterance)
}

onMounted(() => {
  speakWord()
})

const addLetter = (letter) => {
  userInput.value += letter
}

const deleteLetter = () => {
  userInput.value = userInput.value.slice(0, -1)
}

const checkInput = () => {
  
}
</script>

<style scoped>
.writing-view {
    color:blue ;
  text-align: center;
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.speak-button {
  margin-bottom: 1rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

.input-container {
  margin: 1rem 0;
}

.word-input {
  font-size: 3rem;
  color: blue;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}

.letter-feedback {
  margin: 1rem 0;
  font-size: 2rem;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
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
</style>
