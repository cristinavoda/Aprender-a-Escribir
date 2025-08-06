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


let isDrawing = false
const dibujarLetraGuia = () => {
  clearCanvas()
  ctx.font = '160px Arial'
  ctx.fillStyle = 'rgba(200, 200, 200, 0.9)' 
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
  margin-top: -10px;
  margin: -70px;
}

.letra-guia {
  margin-left: -100px;
  font-size: 6rem;
  color: #0097A7;
  margin-bottom: rem;
  font-weight: bold;
   text-shadow: 2px 2px #80deea, 4px 4px rgba(0, 0, 0, 0.2);
}

canvas {
  border: 2px solid  #0097A7;
  color: aqua;
  border-radius: 10px;
  touch-action: none;
  margin-bottom: 1rem;
  border: transparent;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
}

button {
  margin: 0.25rem;
  background-color: #0097A7;
  color: white;
  font-size: 3rem;
  height: 75px;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
}

.teclado-letras {
  display: grid;
  grid-template-columns: repeat(7, 1fr); 
  gap: 8px; 
  width: fit-content; 
  margin: 0 auto; 
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);

}
@media (min-width: 768px) {
  .teclado {
    grid-template-columns: repeat(5, 1fr);
  }
}
.teclado-letra {
  font-size: 4rem;
 box-sizing: border-box;
  color: rgb(235, 243, 242);
  width: 75px;
  height: 75px;
  border-color:#081d24;
  background-color: #0a78ace1;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(40, 14, 184, 0.842);
}

</style>
