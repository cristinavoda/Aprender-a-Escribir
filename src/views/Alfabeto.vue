<script setup>
import { ref, onMounted } from 'vue'

const letter = ref('')
const inputRef = ref(null)

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
  'X', 'Y', 'Z'
]

const speakLetter = (ltr) => {
  letter.value = ltr + ltr.toLowerCase()

  const utterance = new SpeechSynthesisUtterance(ltr)
  utterance.lang = 'es-ES'
  speechSynthesis.cancel()
  speechSynthesis.speak(utterance)
}

onMounted(() => {
  inputRef.value?.focus()  
})
</script>

<template>
  <div class="alfabeto-container">
    <h2>Aprender el Alfabeto</h2>

   
    <input
      ref="inputRef"
      v-model="letter"
      placeholder="?"
      readonly
      class="input-letra"
    />

    <div class="teclado">
      <button
        v-for="ltr in letters"
        :key="ltr"
        class="tecla"
        @click="speakLetter(ltr)"
      >
        {{ ltr }}
      </button>
    </div>
  </div>
</template>

<style scoped>

h2 {
  background: linear-gradient(45deg, #310ff1, #c2cde9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: xx-large;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 2px rgba(55, 131, 218, 0.459);
}

.input-letra {
  color:blue;
  font-size: 4rem;
  width: 150px;
  height: 150px;
  text-align: center;
  margin-bottom: 1rem;
  pointer-events: none; 
  background-color: #d9d8f065;
  border: transparent;
  border-radius: 0.5rem;
  user-select: none; 
   box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);

}
.teclado {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 8px; 
  max-width: 600px; 
  margin: 4px 4px; 
  padding: 1px;
}

.tecla {
  font-size: 3.2rem;
  padding: 0.4rem;
  color: blue;
  width: 65px;
  height: 65px;
  border-color:#87cbe2;
  background-color: #d9d8f065;
    box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);

  border-radius: 8px;
  cursor: pointer;
}

</style>
