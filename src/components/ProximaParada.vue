<template>
  <button class="proxima-parada" @click="irASiguiente">
    🚂 Próxima parada: <strong>{{ siguienteParada.nombre }}</strong> 🚃🚃
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { paradas } from "../paradas";

const route = useRoute();
const router = useRouter();

const indiceActual = computed(() =>
  paradas.findIndex(p => p.ruta === route.path)
);

const siguienteParada = computed(() => 
  paradas[indiceActual.value + 1] || { nombre: "¡Viaje completado!", ruta: "/" }
);

const irASiguiente = () => {
  if (siguienteParada.value.ruta) {
    router.push(siguienteParada.value.ruta);
  }
};
</script>

<style scoped>
.proxima-parada {
  margin-top: 20px;
  background: #ffcc00;
  border: none;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 3px 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}
.proxima-parada:hover {
  transform: scale(1.05);
  background: #ffd633;
}
</style>
