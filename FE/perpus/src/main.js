import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faFolderPlus, faEye, faTrash, faSave, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faFolderPlus, faEye, faTrash, faSave, faSignOutAlt)

import axios from 'axios'

// Set up Axios
axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.withCredentials = true // Mengatur withCredentials menjadi true
axios.defaults.withXSRFToken = true // Mengatur withXSRFToken menjadi true

const app = createApp(App)

app.config.globalProperties.$http = axios

app.component('font-awesome-icon', FontAwesomeIcon) // Registrasi komponen FontAwesome

app.use(createPinia())
app.use(router)
app.use(bootstrap)

app.mount('#app')
