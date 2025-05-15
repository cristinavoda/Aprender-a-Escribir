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
  inputRef.value?.focus()  // pone el foco automáticamente al cargar
})
</script>

<template>
  <div class="alfabeto-container">
    <h2>Aprender el Alfabeto</h2>

    <!-- Input para que aparezca la letra pulsada -->
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
.input-letra {
  color:blue;
  font-size: 3rem;
  width: 150px;
  height: 150px;
  text-align: center;
  margin-bottom: 1rem;
  pointer-events: none; 
  background-color: #d9d8f065;
  border: 2px solid #e9edee;
  border-radius: 0.5rem;
  user-select: none; 
}
.teclado {
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 8 columnas iguales */
  gap: 8px; /* espacio entre botones */
  max-width: 600px; /* ancho máximo opcional */
  margin: 0 auto; /* centrar horizontalmente */
  padding: 10px;
}

.tecla {
  font-size: 3.2rem;
  padding: 0.6rem;
  color: blue;
  width: 65px;
  height: 65px;
  border:#e3e6e7;
  background-color: #d9d8f065;
  
  border-radius: 8px;
  cursor: pointer;
}

</style>
