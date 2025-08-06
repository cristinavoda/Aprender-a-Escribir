<template>
  <div id="app">
   
    <AppNavbar />
    
    <router-view />
  </div>
  <div class="train-container">
    <div class="train" @animationend="onTrainStop">
      🚂
    </div>
  </div>
</template>

<script >
import AppNavbar from './components/AppNavbar.vue';
import Teclado from './components/Teclado.vue';

export default {
   components: {
    AppNavbar, 
  },
  methods: {
    onTrainStop() {
      const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
      audio.play();
    }
  }
}
</script>




<style>
#app {
  max-width: 600px;
  margin: 0px;
  padding: 2rem;
  text-align: center;
  color: blue;
  font-size: x-large;
}
.train-navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(90deg, #099dd8, #e6e6e6);
  border-bottom: 3px solid #ccc;
}

.train-navbar button {
  border: none;
  padding: 0.75rem 1rem;
  margin: 0;
  background: linear-gradient(145deg, #78cbda, #d4d4d4);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.train-navbar button.locomotive {
  margin-left: 150px;
  font-weight: bold;
  background: linear-gradient(145deg, #a7d7eb, #c0c0c0);
}

.train-navbar button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.train-navbar button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 4px rgba(80, 45, 209, 0.2);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 160px;
  width: 100%;
  background-color: #004c4c;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

.nav-btn {
  color: white;
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
  transition: background 0.3s;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.train-container {
  width: 100%;
  height: 190px;
  overflow: hidden;
  position: relative;
  background-color: transparent; 
  border-bottom: 1px solid #3d3fc0;
}

.train {
  margin-top: 30px;
  position: absolute;
  font-size: 5rem;
  left: -20%;
  animation: moveTrain 5s ease-in-out forwards;
}


@keyframes moveTrain {
  0% {
    left: -29%;
    transform: scaleX(1);
  }
  70% {
    left: 40%;
  }
  100% {
    left: 50%;
    transform: scaleX(1.1);
  }
}
 
@keyframes moveTrain {
  0% {
    transform: translateX(-190px);
  }
  30% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
}

.train-navbar {
  animation: moveTrain 6s ease-in-out infinite;
}

@media (min-width: 768px) {
  .keyboard {
    grid-template-columns: repeat(7, 1fr);
  }}
</style>
