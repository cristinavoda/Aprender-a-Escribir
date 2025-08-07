<template>
  <nav class="navbar">
    <nav class="train-navbar">
    <button class="locomotive" @click="$router.push('/Inicio')">
      🚂Inicio
    </button>
    <button @click="$router.push('/alfabeto')">🔤Alfabeto</button>
    <button @click="$router.push('/dibujar')">✏️Dibujar</button>
    <button @click="$router.push('/escribir')">Escribir</button>
    <button @click="$router.push('/puzzle')">🧩Puzzle</button>
    <button @click="$router.push('/miniJuegoAlfabeto')">🎮Juego</button>
    <button @click="$router.push('/desafio')">⭐Desafio</button>
    <button @click="$router.push('/seleccionar')">📚Seleccionar</button>
    <button @click="$router.push('/practicar')">🎁Practicar</button>
  </nav>
   
    
    
     
  </nav>
  
</template>

<script setup>

</script>

<style scoped>
.navbar {
 
  display: flex;
 position: fixed;       /* Siempre visible arriba */
  top: 0;                /* Pegado al borde superior */
  left: 0;
  right: 0;
  margin: 0;             /* Elimina margen exterior */
  padding: 10px 20px;    /* Espaciado interior */
  height: auto;          /* Se adapta al contenido */
  background-color: #fff;  /* O el color que prefieras */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Sombra suave */
  z-index: 1000;         
}
.train-navbar {
  margin-top: 10px;
  display: flex;
 
  justify-content: left;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(90deg, #ffffff, #e6e6e6);
  border-bottom: 3px solid #ccc;
}

.train-navbar button {
  border: none;
  padding: 0.75rem 1rem;
  margin: 0;
  background: linear-gradient(145deg, #0f8aa8, #d4d4d4);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 5px 2px 5px rgba(88, 8, 153, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.train-navbar button.locomotive {
  font-weight: bold;
  background: linear-gradient(145deg, #44cde6, #c0c0c0);
}

.train-navbar button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.train-navbar button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.navbar a {
  display: inline;
  color: #2b08f1;
  text-decoration: none;
}
.router-link-exact-active {
  text-decoration: underline;
  color: #2c728a;
}
.router-link-hover {
  color: aqua;
}
</style>