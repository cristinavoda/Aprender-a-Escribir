import { createRouter, createWebHistory } from 'vue-router'
import Alfabeto from '../views/Alfabeto.vue'
import Seleccionar from '../views/Seleccionar.vue'
import Escribir from '../views/Escribir.vue'
import Dibujar from '../views/Dibujar.vue'
import Puzzle from '../views/Puzzle.vue'
import Letras from '../views/Letras.vue'
import Referencia from '../views/Referencia.vue'
import Practicar from '../views/Practicar.vue'
import Galeria from '../views/Galeria.vue'
import Teclado from '../components/Teclado.vue'


const routes = [
  { path: '/alfabeto', name: 'Alfabeto', component: Alfabeto },
  { path: '/', name: 'Seleccionar', component: Seleccionar },
  { path: '/escribir', name: 'Escribir', component: Escribir },
  { path: '/dibujar', name: 'Dibujar', component: Dibujar },
  { path: '/puzzle', name: 'Puzzle', component: Puzzle },
  { path: '/letras', name: 'Letras', component: Letras },
  { path: '/practicar', name: 'Practicar', component: Practicar },
  { path: '/galeria', name: 'Galeria', component: Galeria },
  { path: '/referencia', name: 'Referencia', component: Referencia },
   { path: '/teclado', name: 'Teclado', component: Teclado },
    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
