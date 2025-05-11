<template>
  <div class="galeria-view">
    <h2>Selecciona imagen y escribe palabra</h2>

    <input
      v-model="palabra"
      type="text"
      placeholder="Escribe la palabra asociada"
      class="input-palabra"
    />

    <div class="grid">
      <div v-for="imagen in imagenes" :key="imagen.id" class="card">
        <img :src="imagen.largeImageURL" @click="seleccionarImagen(imagen)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSelectionStore } from '../stores/useSelectionStore'

const palabra = ref('')
const imagenes = ref([])
const selectionStore = useSelectionStore()

async function fetchPixabay() {
  const response = await fetch(
    `https://pixabay.com/api/?key=43441518-85d5d394329fe4bdef820c138&q=naturaleza&image_type=photo&per_page=6`
  )
  const data = await response.json()
  imagenes.value = data.hits
}

function seleccionarImagen(imagen) {
  if (!palabra.value.trim()) {
    alert('Por favor escribe una palabra antes de seleccionar.')
    return
  }
  selectionStore.setSelection(imagen.largeImageURL, palabra.value)
  palabra.value = ''
}

onMounted(() => {
  fetchPixabay()
})
</script>

<style scoped>
.input-palabra {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.card img {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}
.card img:hover {
  transform: scale(1.05);
}
</style>
