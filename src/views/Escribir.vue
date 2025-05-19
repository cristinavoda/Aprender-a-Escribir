<template>
  <div class="writing-view">
    
<input
    v-model="suggestedWord"
    type="text"
    class="input-box"
    placeholder="Palabra sugerida"
   
  />
   

    <div class="input-container">
      <input
        v-model="userInput"
        @input="checkInput"
        type="text"
        class="word-input"
        placeholder="Escribe aquí..."
      />
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
 <button @click="speakWord" class="speak-button">📢</button>
</template>

<script setup>
import { ref, onMounted ,watch} from 'vue'

const props = defineProps(['word'])

const userInput = ref('')
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
const word = ref(props.word ||'')


function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'es-ES'; 
  speechSynthesis.speak(utterance);
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
  display: flex;
  flex-direction: column;
  gap: 0,5rem; 
  text-align: center;
  max-width: 600px;
  margin: auto;
  padding: 0,5rem;
}



.input-box {
  width: fit-content;
  margin-top: 15px;
  background-color: #d9d8f065;
  border: transparent;
  color: blue;
  padding: 0.5rem;
  font-size: 2.5rem; 
  border-radius: 0.9rem;
  width: 100%;
  text-transform: uppercase;
   box-shadow: 5px 4px 5px rgba(63, 44, 173, 0.678);
}




.input-container {
  margin: 1rem 0;
}

.word-input {
  border-color: 1px solid #d5edf3;
  background-color: #d9d8f065;
  color: blue;
  padding: 0.5rem;
  font-size: 3.5rem; 
  border: transparent;
  border-radius: 0.9rem;
  box-shadow: #13a9e4;
  width: 100%;
  text-transform: uppercase;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
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
  display: grid;
  
  grid-template-columns: repeat(5, 1fr); 
  gap: 8px; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 10px;
}

.key {
  font-size: 2.2rem;
  padding: 0.6rem;
  color: blue;
  width: 65px;
  height: 65px;
  
  border-color: rgb(202, 230, 230);
  background-color: #eaeaf3cb;
   box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
}

.delete {
  background-color: #f0d8d8;
}
.speak-button {
  width: fit-content;
  font-size: 2x-large;
  border: #e2e5ec;
  border-radius: 8px;
  background-color: #d9d8f065;
  margin-left: 10px;
  margin-top: 50px;
  margin-bottom: 1rem;
  color: blue;
  font-size: 1rem;
  padding: 1rem 2rem;
}

</style>