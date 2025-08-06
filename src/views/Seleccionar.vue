<template>
  <div class="select-view">
    <input
      type="file"
      accept="image/*"
      class="file-type-input"
      @change="onImageChange" />

    <div v-if="imageUrl" class="image-preview">
      <img :src="imageUrl" alt="Imagen seleccionada" />
    </div>
  </div> 

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
<div class="writing-view">
    
    
<input
    v-model="suggestedWord"
    type="text"
    class="input-box"
    placeholder="Palabra sugerida"
   
  />
</div>
  <input
      v-model="word"
      type="text"
      placeholder="Escribe la palabra"
      class="word-input"
       @focus="inputActivo = 'word'"
    />
   <div class="letter-feedback">
  <span
    v-for="(letter, index) in palabraSugerida"
    :key="index"
    :class="{
      correct: userInput[index] === letter,
      incorrect: userInput[index] && userInput[index] !== letter,
    }"
  >
    {{ userInput[index] || '_' }}
  </span>
</div>

   
    <div class="teclado">
    <Teclado  @input="agregarLetra" />
</div>

  
   
    <div class="acciones">
      <button @click="deleteLetter">Borrar</button>
      <button @click="checkInput">Comprobar</button>
    </div>
     <p class="mensaje">{{ mensaje }}</p>

 <button @click="speakWord" class="speak-button">📢 Escuchar palabra</button>
   
    <button
      :disabled="!word || !imageUrl"
      @click="irAVistaEscribir"
      class="next-button"
    >
      Siguiente ➡️
    </button>
  
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectionStore } from '../stores/useSelectionStore'
import Teclado from '../components/Teclado.vue'
import { watch } from 'vue'

 function agregarLetra(letra) {
  if (letra === 'BORRAR') {
    word.value = word.value.slice(0, -1)
  } else {
    word.value += letra
  }
}

const selectionStore = useSelectionStore()
function seleccionarImagen(imagen) {
  selectionStore.setSelection(imagen.largeImageURL, 'palabra personalizada')
}

const API_KEY = '43441518-85d5d394329fe4bdef820c138'
const searchQuery = ref('')
const images = ref([])
const imageUrl = ref(null)
const palabraSugerida = ref('AGUA') // por ejemplo
const userInput = ref('') // el texto que va escribiendo el usuario
const word = ref('gato')
const shiftOn = ref(false) 
const texto = ref('')
const fileName = ref('')

watch(word, (nuevoValor) => {
  if (nuevoValor.length >= 3) {
    searchImages()
  }
})
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
 
  imageUrl.value = hit.webformatURL
  images.value = [] 
   searchQuery.value = ''   
}


const onImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Si ya había una URL creada, la liberamos
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }

  // Creamos y guardamos la nueva URL
  imageUrl.value = URL.createObjectURL(file)
}

const speakWord = () => {
  if (word.value.trim() !== '') {
    const utterance = new SpeechSynthesisUtterance(word.value)
    utterance.lang = 'es-ES'
    speechSynthesis.speak(utterance)
  }
}
onMounted(() => {
  speakWord()
})

const onImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
     fileName.value = file.name
  }
}
function checkInput() {
  if (userInput.value === word.value) {
    mensaje.value = '¡Correcto! 🎉'
    speak('¡Correcto!')
  } else {
    mensaje.value = 'Intenta de nuevo.'
    speak('Intenta de nuevo')
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


.file-visible-input {
  font-size: 1.5rem;
  background-color: rgb(251, 252, 252);
  padding: 1rem;
  width: fit-content;
  border: transparent;
  border-radius: 10px;
  margin-top: 1rem;
  margin-left: -120px;
   box-shadow: 4px 4px 12px rgba(54, 57, 58, 0.1);
}

.file-name {
  margin-top: 0.5rem;
  font-size: 6xl;
  
  color: #290ad6ad;
  font-weight: bolder;
  word-break: break-word;
  text-align: center;
}

.select-view {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}
.file-visible-input {
  font-size: xx-large;
  font-weight: bolder;
  color: rgb(23, 19, 226);
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


.result-card p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
  padding: 0 0.5rem;
  text-shadow: 2px 2px #80deea, 4px 4px rgba(0, 0, 0, 0.2);
}
.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border-radius: 12px;
}
.input-box {
  width: fit-content;
  height:fit-content;
  margin-top: 15px;
  background-color: #d9d8f065;
  border: transparent;
  color: blue;
  padding: 0.5rem;
  font-size: 3.3rem; 
  border-radius: 0.9rem;
  width: 100%;
  text-transform: uppercase;
   box-shadow: 5px 4px 5px rgba(63, 44, 173, 0.678);
}

.limpiar-btn {
  margin-top: 10px;
  background-color: #ff6666;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.word-input {
   width: fit-content;
  height:fit-content;
  margin-top: 15px;
  background-color: #d9d8f065;
  border: transparent;
  color: blue;
  padding: 0.5rem;
  font-size: 3.3rem; 
  border-radius: 0.9rem;
  width: 100%;
  text-transform: uppercase;
   box-shadow: 5px 4px 5px rgba(63, 44, 173, 0.678);

  
}

.next-button {
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  background-color: #edeff0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.teclado {
display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 8px; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 10px; 
}
 @media (min-width: 768px) {
  .teclado {
    grid-template-columns: repeat(7, 1fr);
  }
}
.tecla {
  font-size: 4.2rem;
  padding: 0.4rem;
  color: blue;
  width: 95px;
  height: 65px;
  border: 2px solid #87cbe2;
  background-color: #d9d8f065;
  box-shadow: 4px 4px 5px rgba(44, 16, 201, 0.678);
  border-radius: 8px;
  cursor: pointer;
}


</style>
