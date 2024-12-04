<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import alertify from 'alertifyjs'
import { useUserStore } from '../stores/counter'

// Setup variables and store
const isbn_readonly = ref(false)
const theroute = useRoute()
const therouter = useRouter()
const store = useUserStore()
const isbn = ref('')
const judul = ref('')
const pengarang = ref('')
const tahun = ref(new Date().getFullYear())

const customConfig = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${store.token}`
}

const thedata = computed(() => ({
  isbn: isbn.value,
  judul: judul.value,
  pengarang: pengarang.value,
  tahun: tahun.value
}))

// Function to save book data
function save() {
  const store_or_update = theroute.params.theisbn !== undefined ? 'update' : 'store'
  axios({
    url: `http://localhost:8000/api/book/${store_or_update}`,
    method: 'post',
    data: thedata.value,
    headers: customConfig
  }).then(response => {
    console.log(response.data) // Only for development
    if (response.data.success === true) {
      alertify.alert('Information', 'Data has been saved!', function() { alertify.success('OK') })
      therouter.push('/buku')
    }
  }).catch(error => {
    console.log('AJAX Error:', error)
  })
}

// Function to cancel and go back to book list
function cancel() {
  therouter.push('/buku')
}

// Fetch book data if editing
onMounted(() => {
  if (theroute.params.theisbn !== undefined) {
    isbn_readonly.value = true
    axios({
      url: `http://localhost:8000/api/book/show/${theroute.params.theisbn}`,
      method: 'get',
      headers: customConfig
    }).then(response => {
      console.log(response.data) // Only for development
      if (response.data.success === true) {
        const data = response.data.data
        isbn.value = data.isbn
        judul.value = data.judul
        pengarang.value = data.pengarang
        tahun.value = data.tahun
      }
    }).catch(error => {
      console.log('AJAX Error:', error)
    })
  }
})
</script>

<template>
  <div>
    <h2>{{ theroute.params.theisbn !== undefined ? 'Edit' : 'Add' }} Book</h2>
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input type="text" class="form-control" id="isbn" v-model="isbn" :readonly="isbn_readonly" required>
      </div>
      <div class="form-group">
        <label for="judul">Judul:</label>
        <input type="text" class="form-control" id="judul" v-model="judul" required>
      </div>
      <div class="form-group">
        <label for="pengarang">Pengarang:</label>
        <input type="text" class="form-control" id="pengarang" v-model="pengarang" required>
      </div>
      <div class="form-group">
        <label for="tahun">Tahun:</label>
        <input type="number" class="form-control" id="tahun" v-model="tahun" min="1980" max="2040" required>
      </div>
      <div class="d-flex flex-row justify-content-center gap-2">
        <button type="submit" class="btn btn-success mt-3 btn-lg">Save</button>
        <button type="button" class="btn btn-danger mt-3 ms-2 btn-lg" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
button {
  margin-top: 10px;
}
</style>
