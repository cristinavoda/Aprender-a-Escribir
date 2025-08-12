<script setup>
import { ref, onMounted,computed } from 'vue'
import Personaje from '../components/Personaje.vue'
import imagenFeliz from '../assets/personaje-feliz.png'
import imagenTriste from '../assets/personaje-triste.png'
import { RouterLink, RouterView } from 'vue-router'
import BotonProximaParada from '../components/BotonProximaParada.vue'
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
const puntos1 = ref(0)
const puntos2 = ref(0)
const vagonesActivos = computed(() => Math.max(puntos1.value, puntos2.value))

onMounted(() => {
  inputRef.value?.focus()  
})
</script>

<template>
  <div class="alfabeto-container">
   
   
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
    <BotonProximaParada nombre="Dibujar letras" ruta="/dibujar" />
      </div>
<div class="train-container">
  <div class="train-track">
    <div class="train">
       <div class="smoke"></div>
      🚂 <span class="wagon">🚃</span><span class="wagon">🚃</span><span class="wagon">🚃</span><span class="wagon">🚃</span>
    </div>
  </div>
  
</div>

  
</template>

<style scoped>

alfabeto-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; 
  text-align: center;
  max-width: 600px;
  margin-top: 120px;           
  padding: 1px;       
  text-align: left;  
  margin-left: -10px;;  
}

h2 {
  position: fixed;       
  margin-top: 100px;                
  left: 0;
  right: 0;
  
  background: linear-gradient(45deg, #0f083ae5, #36b6af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
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
  margin-top: 3rem;
  margin: 20px;
  pointer-events: none; 
  background-color: #d9d8f065;
  border-color:#aa87e2;
  border-radius: 0.5rem;
  user-select: none; 
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);

}
.teclado {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  grid-row-gap: 10px;
  grid-column-gap: 4px;
  max-width: 600px; 
  padding: 1px;
  margin: 20px;
}
 @media (min-width: 768px) {
  .teclado {
    grid-template-columns: repeat(7, 1fr);
  }
}
.tecla {
  font-size: 3.2rem;
  padding: 0.4rem;
  color: blue;
  width: 12vw;  
  height: 8vw;   
  max-width: 95px; 
  max-height: 65px;
  border-color:#aa87e2;
  background-color: #d9d8f065;
  box-shadow: 9px 9px 9px rgba(118, 99, 231, 0.678);
  border-radius: 8px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .tecla {
   width: 12vw;   
    height: 8vw;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .tecla {
  width: 14vw;
    height: 10vw;
    font-size: 0.9rem;
  }
}
 .train-container {
    position: relative;
    width: 100%;
    height: 120px;
    overflow: hidden;
    margin-top: 60px;
    margin-left: 10px;
    border: none; 
  }
  .train-track {
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 30px;
    background: repeating-linear-gradient(
      to right,
      #c2e20a 0 5px,
      #eee 5px 10px
    );
  }
  .train {
    position: absolute;
    bottom: 10px;
    font-size: 3rem;
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

  @keyframes moveTrain {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-200px);
    }
  }

  @keyframes puff {
    0% {
      transform: translateY(0) scale(0.5);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) scale(1);
      opacity: 0.3;
    }
    100% {
      transform: translateY(-40px) scale(0.5);
      opacity: 0;
    }
  }
.personaje.triste img {
  
   margin-top: 10px;
  animation: encoger 1s ease-in-out;
}
.personaje-feliz{
  animation: saltar 1s ease-in-out;
   position: fixed;
  top: 10px;
  right: 10px;
  width: 100px; 
  z-index: 1000;
  pointer-events: none;
}

@keyframes chuff {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
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

.vagon {
  transform: scale(0.7);
  transition: transform 0.3s ease, opacity 0.3s;
}

.vagon.activo {
  transform: scale(1.1);
  opacity: 1;
}
@media (max-width: 600px) {
  .navbar {
    padding: 8px 12px;
  }

  .contenido {
    margin-top: 50px;
  }
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
