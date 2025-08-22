<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  nombre: String, 
  ruta: String 
})

const router = useRouter()

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES'
  speechSynthesis.speak(utterance)
}

function irALaParada() {
  speak(`Próxima parada: ${props.nombre}`)
  setTimeout(() => {
    router.push(props.ruta)
  }, 1500) 
}
</script>

<template>
  <div class="proxima-parada">
    <button @click="irALaParada" class="tren-btn">
      🚂 Próxima parada: <strong>{{ nombre }}</strong> 🚃🚃
    </button>
  </div>
</template>

<style scoped>
.proxima-parada {
  text-align: center;
  margin-top: 2rem;
}

.tren-btn {
  background: linear-gradient(to right, #0b6363, #089c9c);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.tren-btn:hover {
  transform: translateX(5px);
}
.proxima-parada button {
  padding: 0.8rem 1.2rem;
   background-color: #0a78ace1;
 
  border: none;
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>