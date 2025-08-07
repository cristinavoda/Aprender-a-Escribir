<script setup>
import { ref, onMounted,computed } from 'vue'

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
    <div class="tren-progreso">
  <span class="locomotora">🚂🚃🚃🚃🚃🚃</span>
  <span 
    v-for="n in vagonesActivos" 
    :key="n" 
    class="vagon activo"
  >🚃</span>
</div>

  </div>
</template>

<style scoped>
.alfabeto-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; 
  text-align: center;
  max-width: 600px;
  margin-top: 60px;           
  padding: 1px;       
  text-align: left;    
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
  grid-row-gap: 10px;
  grid-column-gap: 4px;
  max-width: 600px; 
  padding: 1px;
  margin: -20px;
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
  width: 95px;
  height: 65px;
  border-color:#87cbe2;
  background-color: #d9d8f065;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
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
}
@media (max-width: 600px) {
  .navbar {
    padding: 8px 12px;
  }

  .contenido {
    margin-top: 50px;
  }
}


</style>
