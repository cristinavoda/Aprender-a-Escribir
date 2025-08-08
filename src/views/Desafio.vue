<template>
  <div class="juego-container">
    <h1>Batalla de Letras</h1>

    <div class="letra-display">{{ currentLetter }}</div>

    <button class="voz-btn" @click="decirLetra">🔊 Escuchar letra</button>

    <div class="botones-jugadores">
      <button class="jugador-btn jugador1" @click="turno = 1">Jugador 1 🚀</button>
      <button class="jugador-btn jugador2" @click="turno = 2">Jugador 2 🌟</button>
    </div>

    <div v-if="turno > 0" class="input-respuesta">
      <p>Jugador {{ turno }}, escribe una palabra que empiece por "{{ currentLetter }}":</p>
      <input v-model="respuesta" placeholder="Ej: Barco" />
      <button @click="validarRespuesta">Comprobar</button>
      
    </div>
<button @click="escucharVoz">🎤 Decir palabra en voz alta</button>

    <p class="mensaje">{{ mensaje }}</p>

    <div class="marcador">
      <span>Jugador 1: {{ puntos1 }}</span>
      <span>Jugador 2: {{ puntos2 }}</span>
    </div>

    <button class="nueva-letra" @click="nuevaRonda">Siguiente Letra 🔁</button>
    
  </div>
  <div class="tren-progreso">
  <span>🚂</span>
 <span v-for="n in vagonesActivos" :key="n" class="vagon activo">🚃</span>

</div>

</template>

<script setup>
import { ref,computed } from 'vue'
import confetti from 'canvas-confetti'

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const currentLetter = ref('A')
const puntos1 = ref(0)
const puntos2 = ref(0)
const mensaje = ref('')
const turno = ref(0)
const respuesta = ref('')

const totalVagones = 10
const vagonesActivos = computed(() => Math.max(puntos1.value, puntos2.value))
const emit = defineEmits(['cambiarEstadoPersonaje'])

function verificarRespuesta(esCorrecta) {
  if (esCorrecta) {
    emit('cambiarEstadoPersonaje', 'feliz')
  } else {
    emit('cambiarEstadoPersonaje', 'triste')
  }
}
function nuevaRonda() {
  const randomIndex = Math.floor(Math.random() * letras.length)
  currentLetter.value = letras[randomIndex]
  mensaje.value = '¡Pulsa tu botón si sabes una palabra!'
  turno.value = 0
  respuesta.value = ''
  decirLetra()
}

function decirLetra() {
  const utter = new SpeechSynthesisUtterance(currentLetter.value)
  utter.lang = 'es-ES'
  speechSynthesis.speak(utter)
}

function validarRespuesta() {
  const palabra = respuesta.value.trim().toUpperCase()
  if (palabra.startsWith(currentLetter.value)) {
    if (turno.value === 1) puntos1.value++
    if (turno.value === 2) puntos2.value++
    mensaje.value = `✅ ¡Jugador ${turno.value} acierta con "${palabra}"!`
    emit('accionUsuario', { tipo: 'correcta' })
     emit('cambiarEstadoPersonaje', 'feliz')
  } else {
    mensaje.value = `❌ "${palabra}" no empieza por "${currentLetter.value}"`
     emit('accionUsuario', { tipo: 'incorrecta' })
     emit('cambiarEstadoPersonaje', 'triste')
  }

  turno.value = 0
  respuesta.value = ''

  if (puntos1.value >= 10 || puntos2.value >= 10) {
    mensaje.value = `🎉 ¡Jugador ${puntos1.value >= 10? '1' : '2'} gana la partida!`
  }
  if (palabra.startsWith(currentLetter.value)) {
  if (turno.value === 1) puntos1.value++
  if (turno.value === 2) puntos2.value++
  mensaje.value = `✅ ¡Jugador ${turno.value} acierta con "${palabra}"!`
  lanzarEstrellas()
  reproducirSonidoAcierto()
  reproducirSonidoTren()
  mostrarMensaje('¡Buen trabajo! 🚂')
}

}
let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const palabraDicha = event.results[0][0].transcript.trim().toUpperCase();
    respuesta.value = palabraDicha;
    validarRespuesta(); // usamos la misma función de antes
  };

  recognition.onerror = (event) => {
    mensaje.value = '❌ No se entendió. Intenta de nuevo.';
  };
} else {
  mensaje.value = 'Este navegador no soporta reconocimiento de voz.';
}

function escucharVoz() {
  if (recognition) {
    mensaje.value = '🎤 Escuchando... Di tu palabra claramente.';
    recognition.start();
  } else {
    mensaje.value = '❌ Tu navegador no soporta reconocimiento de voz.';
  }
}
function lanzarEstrellas() {
  confetti({
    particleCount: 70,
    spread: 100,
    origin: { y: 0.5 }
  })
}
function reproducirSonidoAcierto() {
  const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3');
  audio.play();
}
function reproducirSonidoTren() {
  const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/387'); // sonido tren
  audio.play();
}

function mostrarMensaje(texto) {
  mensaje.value = texto
  setTimeout(() => mensaje.value = '', 2000)
}

</script>
 <style scoped>
.juego-container {
  text-align: center;
  padding: 2rem;
  font-family: 'Comic Sans MS', sans-serif;
}

.letra-display {
  font-size: 5rem;
  margin: 1rem;
  color: #00796b;
}

.botones-jugadores {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.jugador-btn {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
}

.jugador1 {
  background-color: #4caf50;
}

.jugador2 {
  background-color: #2196f3;
}

.marcador {
  margin-top: 2rem;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nueva-letra {
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  background-color: #ffc107;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.voz-btn {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  background-color: #ffcc00;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.input-respuesta {
  margin-top: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #ccc;
  margin-right: 0.5rem;
}
.tren-progreso {
  margin-top: 2rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
}

.locomotora {
  animation: chuff 1s ease infinite;
}

@keyframes chuff {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.vagon {
  transform: scale(0.7);
  transition: transform 0.3s ease, opacity 0.3s;
}

.vagon.activo {
  transform: scale(1.1);
  opacity: 1;
  animation: rebote 0.3s ease;
}

@keyframes rebote {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.1); }
}
</style>