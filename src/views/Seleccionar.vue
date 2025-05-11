<template>
  <div class="select-view">
    <h2>Selecciona una imagen y escribe la palabra</h2>

   
    <input type="file" accept="image/*" @change="onImageChange" />
    <div v-if="imageUrl" class="image-preview">
      <img :src="imageUrl" alt="Imagen seleccionada" />
    </div>
<form @submit.prevent="searchImages">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Introduce palabra clave"
        class="search-input"
      />
      <button type="submit" class="search-btn">Buscar</button>
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
    </div>
     
    
    <input
      v-model="word"
      type="text"
      placeholder="Escribe la palabra"
      class="word-input"
    />
 <button @click="speakWord" class="speak-button">🔊 Escuchar palabra</button>
   
    <button
      :disabled="!word || !imageUrl"
      @click="irAVistaEscribir"
      class="next-button"
    >
      Siguiente ➡️
    </button>
  
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectionStore } from '../stores/useSelectionStore'

const selectionStore = useSelectionStore()

function seleccionarImagen(imagen) {
  selectionStore.setSelection(imagen.largeImageURL, 'palabra personalizada')
}

const API_KEY = '43441518-85d5d394329fe4bdef820c138'
const searchQuery = ref('')
const images = ref([])
const imageUrl = ref(null)
const word = ref('')
const router = useRouter()
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

function selectImage(hit) {
  const word = hit.tags.split(',')[0].toUpperCase()
  const imageUrl = hit.webformatURL
  router.push({ name: 'Escribir', query: { word, imageUrl } })
}
const onImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}
const speakWord = () => {
  if (word.value.trim() !== '') {
    const utterance = new SpeechSynthesisUtterance(word.value)
    utterance.lang = 'es-ES'
    speechSynthesis.speak(utterance)
  }
}
const onImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}

const irAVistaEscribir = () => {
  router.push({
    name: 'Escribir',
    query: {
      word: word.value.toUpperCase(),
      imageUrl: imageUrl.value
    }
  })
}
</script>

<style scoped>
.select-view {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}
.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1rem;                              
  margin-top: 1.5rem;
  padding: 0 0.5rem;
}

.result-card {
  background: #ffffff;
  border: 2px solid var(--color-text);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}


.result-card img {
  width: 100%;
  object-fit: cover;
}

/* Texto descriptivo */
.result-card p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
  padding: 0 0.5rem;
}
.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border-radius: 12px;
}

.word-input {
  display: block;
  font-size: 1.5rem;
  margin: 1.5rem auto;
  padding: 0.5rem;
  width: 80%;
  text-align: center;
  border-radius: 10px;
}

.next-button {
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  background-color: #90ee90;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
