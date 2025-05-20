<template>
  <div class="writing-view">
    <h2>Escribir la palabra</h2>
    
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
       
    <div class="buton">
      
     
      <button @click="repeatWord">Repetir palabra</button>
      <button @click="checkInput">Comprobar</button>
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
 <button @click="speakWord" class="speak-button">📢</button>
</template>

<script setup>
import { ref, onMounted ,watch} from 'vue'

const userInput = ref('')
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
const word = ref('SUPERFICIEDENADA')


function speak(text) {
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES'
  utterance.rate = 0.9
  utterance.pitch = 1.1
  utterance.volume = 1
  speechSynthesis.speak(utterance)
}



onMounted(() => {
  speak(word)
})

watch(word, (newWord) => {
  userInput.value = ''
  speak(newWord)
})

const addLetter = (letter) => {
  if (userInput.value.length < word.value.length) {
    userInput.value += letter
    speak(letter)
  }
}



const deleteLetter = () => {
  userInput.value = userInput.value.slice(0, -1)
  speak('Borrado')
}

const repeatWord = () => {
  speak(word.value)
}


const checkInput = () => {
  if (userInput.value === word.value) {
    speak('¡Correcto!')
    alert('¡Correcto! 🎉')
  } else {
    speak('Inténtalo otra vez')
    alert('Inténtalo otra vez')
  }
  
}
</script>

<style scoped>
.writing-view {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  gap: 0,5rem; 
  text-align: center;
  max-width: 600px;

  padding: 0,5rem;
}

h2 {
  background: linear-gradient(45deg, #2808dfe5, #5452cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(55, 131, 218, 0.459);
}


.input-box {
  width: fit-content;
  height:fit-content;
  margin-top: 15px;
  background-color: #d9d8f065;
  border: transparent;
  color: blue;
  padding: 0.5rem;
  font-size: 3.3rem; 
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
.div-buton {
  display: inline;
  gap:10px;
  padding: 10px;
  color: #5452cc;
  border: #13a9e4;
}
.keyboard {
  display: grid;
  
  grid-template-columns: repeat(5, 1fr); 
  gap: 8px; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 10px;
}
 @media (min-width: 768px) {
  .keyboard {
    grid-template-columns: repeat(7, 1fr);
  }}
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