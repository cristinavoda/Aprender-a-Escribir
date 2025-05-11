<template>
  <div v-if="selectionStore.selectedImage" class="referencia">
    <img :src="selectionStore.selectedImage.imageUrl" alt="Imagen seleccionada" />
    <p class="palabra">{{ selectionStore.selectedImage.word }}</p>
  </div>
  <p v-else>No has seleccionado ninguna imagen.</p>
</template>

<script setup>
import { useSelectionStore } from '../stores/useSelectionStore'
const selectionStore = useSelectionStore()
</script>

<style scoped>
.referencia {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.palabra {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0056b3;
  margin-top: 0.5rem;
}
</style>
