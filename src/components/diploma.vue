<template>
  <div class="diploma-container">
    <h1>🎉 ¡Felicidades! 🎉</h1>
    <p>Has completado todos los niveles</p>

    <!-- Formulario -->
    <div class="formulario">
      <label>
        Nombre:
        <input v-model="nombre" type="text" placeholder="Tu nombre aquí" />
      </label>

      <label>
        Foto:
        <input type="file" @change="cargarFoto" accept="image/*" />
      </label>
    </div>

    <!-- Diploma con confeti -->
    <div class="diploma" ref="diplomaRef">
      <canvas ref="confetiCanvas" class="confeti-canvas"></canvas>
      <div class="sticker top-left">🌟</div>
      <div class="sticker top-right">🎈</div>

      <h2>Diploma de Graduación</h2>
      <p>Este diploma se otorga a</p>
      <h3>{{ nombre || 'Tu Nombre' }}</h3>
      <div v-if="fotoUrl" class="foto">
        <img :src="fotoUrl" alt="Foto del niño" />
      </div>
      <p>Por completar todos los niveles del juego 🎮</p>
      <div class="sticker bottom-left">🎁</div>
      <div class="sticker bottom-right">🏆</div>
    </div>

    <button @click="imprimirDiploma">🖨️ Imprimir Diploma</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nombre = ref('')
const fotoUrl = ref(null)
const diplomaRef = ref(null)
const confetiCanvas = ref(null)

function cargarFoto(event) {
  const file = event.target.files[0]
  if (file) {
    fotoUrl.value = URL.createObjectURL(file)
  }
}

function imprimirDiploma() {
  if (!diplomaRef.value) return
  const printContents = diplomaRef.value.innerHTML
  const originalContents = document.body.innerHTML

  document.body.innerHTML = printContents
  window.print()
  document.body.innerHTML = originalContents
}

// --------------------
// Confeti simple
// --------------------
onMounted(() => {
  const canvas = confetiCanvas.value
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const confeti = []
  const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1b9', '#f9bec7']

  for (let i = 0; i < 100; i++) {
    confeti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 1 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    confeti.forEach(c => {
      ctx.beginPath()
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
      ctx.fillStyle = c.color
      ctx.fill()
      c.y += c.d
      if (c.y > canvas.height) c.y = -10
    })
    requestAnimationFrame(draw)
  }

  draw()
})
</script>

<style scoped>
.diploma-container {
  text-align: center;
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  position: relative;
}

.formulario {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

input[type="text"],
input[type="file"] {
  padding: 5px 10px;
  border-radius: 8px;
  border: 2px  darkcyan;
  font-size: 1rem;
}

.diploma {
  position: relative;
  border: 5px  darkcyan;
  border-radius: 20px;
  padding: 40px 20px;
  margin: 20px auto;
  max-width: 400px;
  background: linear-gradient(120deg, #ffffff 0%, #f3e8d1 100%);
  box-shadow: 15px 5px 15px rgba(5, 115, 189, 0.897);
  text-align: center;
  overflow: hidden;
}

.diploma h2 {
  color: darkcyan;
  font-size: 2.8rem;
  margin-top: 10px;
  text-shadow: 3px 2px 2px rgba(55, 131, 218, 0.459);
  
}

.diploma h3 {
  font-size: 2.5rem;
  margin: 10px 20px;
  color: darkcyan;
}

.foto img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 0;
  border: 3px solid darkcyan;
   box-shadow: 15px 5px 15px rgba(5, 115, 189, 0.897);
}

.sticker {
  position: absolute;
  font-size: 2rem;
  z-index: 2;
  box-shadow: 15px 5px 15px rgba(5, 115, 189, 0.897);
}

.top-left { top: -10px; left: -10px; }
.top-right { top: -10px; right: -10px; }
.bottom-left { bottom: -10px; left: -10px; }
.bottom-right { bottom: -10px; right: -10px; }

.confeti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

button {
  padding: 10px 20px;
  background: darkcyan;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 15px;
}

button:hover {
  background: #006666;
}


@media (max-width: 768px) {
  .diploma { max-width: 300px; padding: 30px 15px; }
  .diploma h2 { font-size: 1.5rem; }
  .diploma h3 { font-size: 1.2rem; }
  .sticker { font-size: 1.5rem; }
}

@media (max-width: 480px) {
  .diploma { max-width: 260px; padding: 20px 10px; }
  .diploma h2 { font-size: 1.2rem; }
  .diploma h3 { font-size: 1rem; }
  .sticker { font-size: 1.2rem; }
}
</style>
