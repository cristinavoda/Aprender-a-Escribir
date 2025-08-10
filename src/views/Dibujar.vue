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


  <div class="train-container">
    
     <div class="traffic-light">
  <div class="light red"></div>
  <div class="light yellow"></div>
  <div class="light green"></div>
  </div>

  <div class="train">
  <div class="locomotive">🚂</div>
   <div class="smoke"></div>
  <div class="vagons"><span class="vagon">🚃</span><span class="vagon">🚃</span><span class="vagon">🚃</span><span class="vagon">🚃</span>
        
      </div>
    </div>
</div>



    
</template>

<style scoped>


.trazar-container {
  text-align: center;
  padding: 1rem;
  margin-top: 70px;
  margin-left: -40px;
  
}

.letra-guia {
  margin-top: 90px;
  margin-right: 300px;
  font-size: 6rem;
  color: #0097A7;
  margin-bottom: rem;
  font-weight: bold;
   text-shadow: 2px 2px #80deea, 4px 4px rgba(0, 0, 0, 0.2);
}

canvas {
  margin-top: 0px;
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
  
  box-shadow: 6px 6px 9px rgba(44, 16, 201, 0.678);
}
.teclado-letras {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 8px; 
  width: fit-content; 
  margin: 0 auto; 
  box-shadow: 4px 7px 9px rgba(44, 16, 201, 0.678);
}


@media (min-width: 480px) {
  .teclado-letras {
    grid-template-columns: repeat(7, 1fr);
  }
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
  box-shadow: 6px 6px 9px rgba(44, 16, 201, 0.678);
}


@media (min-width: 480px) {
  .teclado {
    grid-template-columns: repeat(7, 1fr);
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
.train-container {
  position: relative;
  
  position: relative;
  display:flex;
  flex-direction:row;
  justify-content: center;
  align-items:flex-end;
  margin: 3rem 1rem;
  height: 120px; 
}



.locomotive {
  font-size: 3rem;
  margin-right: 10px;
}

.vagons {
  display: flex;
}

.vagon {
  font-size: 2.5rem;
  margin: 10px 15px;
}
.train {
  position: absolute;
  bottom: -30px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  animation: moveTrain 10s linear infinite;
}
.smoke {
  position: absolute;
  top: -30px;
  left: 0;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #b10a34, transparent);
  border-radius: 50%;
  opacity: 0.7;
  animation: puff 1.5s ease-in-out infinite;
}
.traffic-light {
  position: absolute;
  left: 30px;
  bottom: 50px;
  width: 30px;
  background: #222;
  border: 2px solid #444;
  padding: 5px;
  border-radius: 10px;
}

.light {
  width: 20px;
  height: 20px;
  margin: 5px auto;
  border-radius: 50%;
  opacity: 0.3;
}

.red {
  background: red;
  animation: redLight 6s infinite;
}
.yellow {
  background: yellow;
  animation: yellowLight 6s infinite;
}
.green {
  background: limegreen;
  animation: greenLight 6s infinite;
}

@keyframes redLight {
  0%, 100% { opacity: 1; }
  33%, 66% { opacity: 0.3; }
}
@keyframes yellowLight {
  0%, 33% { opacity: 0.3; }
  34%, 66% { opacity: 1; }
  67%, 100% { opacity: 0.3; }
}
@keyframes greenLight {
  0%, 66% { opacity: 0.3; }
  67%, 100% { opacity: 1; }
}


@keyframes puff {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-10px, -30px) scale(1.5);
    opacity: 0.4;
  }
  100% {
    transform: translate(-20px, -60px) scale(2);
    opacity: 0;
  }
}


.wagon {
  margin-left: 5px;
}

@keyframes moveTrain {
  0% {
    right: -90%;
  }
  100% {
    right: 100%;
  }
}

</style>
