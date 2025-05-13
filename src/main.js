
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('✅ Service worker registrado:', reg);
      })
      .catch(err => {
        console.error('❌ Error registrando service worker:', err);
      });
  });
}

