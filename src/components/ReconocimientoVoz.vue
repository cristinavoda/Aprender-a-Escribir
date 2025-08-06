<template>
  <div class="voz-container">
    <button @click="iniciarEscucha" class="mic-btn">🎤 Decir letra</button>
    <p v-if="textoReconocido">Dijiste: <strong>{{ textoReconocido }}</strong></p>
    <p v-if="resultadoValidacion">{{ resultadoValidacion }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textoReconocido = ref('')
const resultadoValidacion = ref('')
const letraEsperada = 'A' // Puedes pasarla como prop si quieres hacerlo dinámico

let recognition

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition()
  recognition.lang = 'es-ES'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript.trim()
    textoReconocido.value = texto

    if (texto.toUpperCase().startsWith(letraEsperada)) {
      resultadoValidacion.value = '✅ ¡Correcto!'
    } else {
      resultadoValidacion.value = '❌ Intenta otra vez'
    }
  }

  recognition.onerror = (event) => {
    resultadoValidacion.value = `⚠️ Error: ${event.error}`
  }
} else {
  alert('Tu navegador no soporta reconocimiento de voz')
}

function iniciarEscucha() {
  textoReconocido.value = ''
  resultadoValidacion.value = ''
  recognition.start()
}
</script>

<style scoped>
.mic-btn {
  font-size: 1.5rem;
  background-color: #ffecb3;
  border: 2px solid #ff9800;
  border-radius: 12px;
  padding: 0.6em 1.2em;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.mic-btn:hover {
  transform: scale(1.1);
}
.voz-container {
  margin-top: 1em;
  text-align: center;
  color: #333;
}
</style>
