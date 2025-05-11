import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSelectionStore = defineStore('selection', () => {
  const selectedImage = ref({
    imageUrl: '',
    word: ''
  })

  // Cargar desde localStorage al iniciar
  const stored = localStorage.getItem('selectedImage')
  if (stored) {
    selectedImage.value = JSON.parse(stored)
  }

  // Guardar automáticamente cuando cambia
  watch(selectedImage, (newVal) => {
    localStorage.setItem('selectedImage', JSON.stringify(newVal))
  }, { deep: true })

  function setSelection(imageUrl , word) {
    selectedImage.value = { imageUrl, word }
  }

  return { selectedImage, setSelection }
})
