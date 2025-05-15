<template>
  <div class="galeria-view">
    <h2>Selecciona imagen y escribe palabra</h2>

<form @submit.prevent="searchImages">

      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔎"
        class="file-visible-input"
         @focus="inputActivo = 'searchQuery'"
      />
      
    </form>
    
    <div class="results-grid">
      <div
        v-for="(hit, index) in images"
        :key="hit.id"
        class="result-card"
        @click="selectImage(hit)">
        <img :src="hit.previewURL" :alt="hit.tags" />
        <p>{{ hit.tags.split(',')[0].toUpperCase() }}</p>
      </div>
    </div>

<div v-if="selectedImageLabel">
  <p>Palabra sugerida: <strong>{{ selectedImageLabel }}</strong></p>
  <button @click="word = selectedImageLabel">Usar esta palabra</button>
</div>

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
async function searchImages() {
  if (!searchQuery.value.trim()) return
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery.value
  )}&image_type=photo&per_page=6`
  try {
    const response = await fetch(url)
    const data = await response.json()
    images.value = data.hits
  } catch (err) {
    console.error('Error fetching images:', err)
  }
}
async function fetchPixabay() {
  const response = await fetch(
    `https://pixabay.com/api/?key=43441518-85d5d394329fe4bdef820c138&q=ocean_type=photo&per_page=11`
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
