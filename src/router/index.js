import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
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
import NivelAlfabeto from '../views/NivelAlfabeto.vue'
import MinijuegoAlfabeto from '../views/MinijuegoAlfabeto.vue'
import Desafio from '../views/Desafio.vue'
const routes = [
 { path: '/inicio', name: 'Inicio', component: Inicio},
  { path: '/alfabeto', name: 'Alfabeto', component: Alfabeto },
  { path: '/seleccionar', name: 'Seleccionar', component: Seleccionar },
  { path: '/escribir', name: 'Escribir', component: Escribir },
  { path: '/dibujar', name: 'Dibujar', component: Dibujar },
  { path: '/puzzle', name: 'Puzzle', component: Puzzle },
  { path: '/letras', name: 'Letras', component: Letras },
  { path: '/practicar', name: 'Practicar', component: Practicar },
  { path: '/galeria', name: 'Galeria', component: Galeria },
  { path: '/referencia', name: 'Referencia', component: Referencia },
   { path: '/teclado', name: 'Teclado', component: Teclado },
   {path: '/nivel-alfabeto',name: 'NivelAlfabeto', component: NivelAlfabeto},
  { path: '/minijuegoalfabeto', component: MinijuegoAlfabeto },
  { path: '/desafio',  name: 'Desafio',component: Desafio }

    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
