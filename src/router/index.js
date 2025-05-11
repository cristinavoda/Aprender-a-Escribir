import { createRouter, createWebHistory } from 'vue-router'
import Seleccionar from '../views/Seleccionar.vue'
import Escribir from '../views/Escribir.vue'
import Puzzle from '../views/PuzzleFlotante.vue'
import PuzzleFlotante from '../views/Puzzle.vue'
import Referencia from '../views/Referencia.vue'
import Practicar from '../views/Practicar.vue'
import Galeria from '../views/Galeria.vue'

const routes = [
  { path: '/', name: 'Seleccionar', component: Seleccionar },
  { path: '/escribir', name: 'Escribir', component: Escribir },
  { path: '/puzzle', name: 'Puzzle', component: Puzzle },
  { path: '/puzzleFlotante', name: 'PuzzleFlotante', component: PuzzleFlotante },
  { path: '/practicar', name: 'Practicar', component: Practicar },
  { path: '/galeria', name: 'Galeria', component: Galeria },
  { path: '/referencia', name: 'Referencia', component: Referencia },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
