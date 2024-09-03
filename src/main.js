import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from "firebase/app";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const firebaseConfig = {
    apiKey: "AIzaSyAZ1JPbtEYX6r-Qn5mFwEQeYgav4jQnHx4",
    authDomain: "week7-lachlan.firebaseapp.com",
    projectId: "week7-lachlan",
    storageBucket: "week7-lachlan.appspot.com",
    messagingSenderId: "878440406644",
    appId: "1:878440406644:web:b1412602d46640bce87b21"
  };

initializeApp(firebaseConfig);
const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
