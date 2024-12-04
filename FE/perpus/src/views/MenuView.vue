<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/counter'
import { storeToRefs, createPinia } from 'pinia'

const pini = createPinia()
const store = useUserStore()
const { thecounter } = storeToRefs(store)
const therouter = useRouter()
const theroute = useRoute() // Add this to useRoute
const customConfig = {
  'Authorization': 'Bearer ' + store.token
}

function logout() {
  axios({
    url: 'http://localhost:8000/api/logout',
    method: 'get',
    headers: customConfig
  }).then(response => {
    console.log(response.data) //only for development
    if (response.data.success === true) {
      store.reset()
      therouter.push('/')
    }
  }).catch(error => {
    console.log('AJAX' + error)
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand text-light fw-bolder" href="#">PERPUSTAKAAN</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/home" active-class="active">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pegawai" active-class="active">PEGAWAI</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/barang" active-class="active">BARANG</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              PERPUSTAKAAN
            </a>
            <ul class="dropdown-menu mt-2 text-center" aria-labelledby="navbarDropdown">
              <li>
                  <router-link class="nav-link" to="/buku" active-class="disable">BUKU</router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                  <router-link class="nav-link" to="#" active-class="disable">PEMINJAMAN</router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                  <router-link class="nav-link" to="#" active-class="disable">PEMBELIAN</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <button class="btn btn-danger ms-auto" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #3f4770; /* Ganti dengan warna yang diinginkan */
}

.navbar .navbar-toggler-icon {
  background-color: white; /* Menyesuaikan warna ikon toggler */
}

.nav-link.active {
  color: white; /* Ubah sesuai dengan warna yang diinginkan */
  background-color: #47508c; /* Warna latar belakang untuk link aktif */
  transition: 0.5s;
  border-radius: 10px;
}

.dropdown-menu {
  background-color: #003366; /* Ganti sesuai warna yang diinginkan */
}
</style>
