<template>
  <div class="nivel-alfabeto">
    <div class="tren-container">
      <img src="..\assets\tren.png" alt="tren" class="tren" />
      <div class="humo"></div>
      <div class="semaforo">
        <div :class="['luz', { verde: semaforoVerde }]"></div>
      </div>
    </div>
    <h1 class="mensaje">¡Vamos a jugar!</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const semaforoVerde = ref(false)

onMounted(() => {
  setTimeout(() => {
    semaforoVerde.value = true
    const audio = new SpeechSynthesisUtterance("¡sube en el tren!")
    speechSynthesis.speak(audio)
  }, 1500)
})
</script>

<style scoped>

.nivel-alfabeto {
  
  display: flex-inline;
    margin-top: 40px;
  text-align: center;
  background-color: #e3f2fd;
  padding: 2rem;
}

.tren-container {
  position: left;
  display: inline-block;
  margin-left: 100px;
  animation: moverTren 5s ease-in-out forwards;
}

.tren {
  width: 150px;
}

.humo {
  position: absolute;
  top: -20px;
  left: 50px;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #ccc 30%, transparent 70%);
  border-radius: 50%;
  animation: humoSube 2s infinite;
  opacity: 0.7;
}

.semaforo {
  position: absolute;
  left: -30px;
  top: 10px;
  width: 15px;
  height: 40px;
  background: #222;
  border-radius: 5px;
}

.luz {
  width: 12px;
  height: 12px;
  margin: 3px auto;
  border-radius: 50%;
  background-color: red;
  transition: background-color 0.5s;
}

.verde {
  background-color: limegreen;
}

@keyframes moverTren {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes humoSube {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-60px) scale(1.5);
    opacity: 0;
  }
}
</style>
