<script setup>
import { ref, onMounted } from 'vue'

const letras = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
  'X', 'Y', 'Z'
]

const letraActual = ref('A')
const canvasRef = ref(null)
let ctx = null

// Dibujo
let isDrawing = false
const dibujarLetraGuia = () => {
  clearCanvas()
  ctx.font = '160px Arial'
  ctx.fillStyle = 'rgba(200, 200, 200, 0.3)' // gris claro translúcido
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const letraCompuesta = letraActual.value.toUpperCase() + letraActual.value.toLowerCase()
  ctx.fillText(letraCompuesta, canvasRef.value.width / 2, canvasRef.value.height / 2)
}

const startDrawing = (e) => {
  isDrawing = true
  ctx.beginPath()
  ctx.moveTo(getX(e), getY(e))
}

const draw = (e) => {
  if (!isDrawing) return
  ctx.lineTo(getX(e), getY(e))
  ctx.stroke()
}

const stopDrawing = () => {
  isDrawing = false
}

const getX = (e) => e.touches ? e.touches[0].clientX - canvasRef.value.offsetLeft : e.offsetX
const getY = (e) => e.touches ? e.touches[0].clientY - canvasRef.value.offsetTop : e.offsetY

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}
const cambiarLetra = (letra) => {
  letraActual.value = letra
  dibujarLetraGuia()
  speakLetter(letra)
}


const speakLetter = (letra) => {
  const utter = new SpeechSynthesisUtterance(letra)
  utter.lang = 'es-ES'
  speechSynthesis.cancel()
  speechSynthesis.speak(utter)
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  ctx.lineWidth = 4
  ctx.strokeStyle = '#0097A7'
  ctx.lineCap = 'round'
  dibujarLetraGuia()

})
</script>

<template>
  <div class="trazar-container">
   
    <div class="letra-guia">
      {{ letraActual }}
    </div>

    <canvas
      ref="canvasRef"
      width="300"
      height="300"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
    ></canvas>

    <button @click="clearCanvas">🧹 Borrar</button>

    <div class="teclado-letras">
      <button
        v-for="letra in letras"
        :key="letra"
        @click="cambiarLetra(letra)"
      >
        {{ letra }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.trazar-container {
  text-align: center;
  padding: 1rem;
}

.letra-guia {
    margin-left: -100px;
  font-size: 6rem;
  color: #0097A7;
  margin-bottom: 1rem;
  font-weight: bold;
}

canvas {
  border: 2px solid  #0097A7;
  border-radius: 10px;
  touch-action: none;
  margin-bottom: 1rem;
}

button {
  margin: 0.25rem;
  background-color: #0097A7;
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.teclado-letras {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 400px;
  margin: 1rem auto 0;
}
</style>
