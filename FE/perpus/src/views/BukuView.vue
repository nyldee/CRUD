<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import alertify from 'alertifyjs'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/counter'

// Setup variables and store
const books = ref([]) 
const store = useUserStore()
const therouter = useRouter()

console.log('Stored Token:', store.token) // Log token for debugging

// Set customConfig to include token when store.token is available
const customConfig = ref({
  'Authorization': `Bearer ${store.token}`,
  'Content-Type': 'application/json',
})

console.log('Authorization Header:', customConfig.value) // Log header for debugging

// Fetch book data on mount
onMounted(() => {
  refreshData()
})

// Function to refresh book data
function refreshData() {
  axios({
    url: 'http://localhost:8000/api/book/buku',
    method: 'get',
    headers: customConfig.value
  }).then(response => {
    console.log('Response Data:', response.data) // Only for development
    if (response.data.success === true) {
      books.value = response.data.data
    } else {
      alertify.error('Failed to fetch books')
    }
  }).catch(error => {
    console.log('AJAX Error:', error)
    alertify.error('Failed to fetch books: Unauthorized')
  })
}

// Function to confirm deletion
function deleteDialog(id) {
  alertify.confirm('Confirmation', 'Are you sure to delete this data?', 
    function() { 
      deleteBook(id)
    }, function() { 
      // Do nothing if canceled
    }
  )
}

// Function to delete book
function deleteBook(id) {
  axios({
    url: `http://localhost:8000/api/book/delete/${id}`,
    method: 'get',
    headers: customConfig.value
  }).then(response => {
    if (response.data.success === true) {
      alertify.alert('Information', 'Data has been deleted!', function() { alertify.success('OK') })
      refreshData()
    } else {
      alertify.error('Failed to delete book')
    }
  }).catch(error => {
    console.log('AJAX Error:', error)
    alertify.error('Failed to delete book: Unauthorized')
  })
}
</script>

<template>
  <div class="container mt-4">
    <!-- Daftar buku tanpa kotak -->
    <h1 class="pt-4" style="color: #3f4770;">DAFTAR BUKU</h1>
    <div class="book-container border p-4 rounded mt-4" style="background-color: #d2dff3;">
      <router-link to="/formbuku">
        <button type="button" class="btn btn-primary">
          <font-awesome-icon :icon="['fas', 'folder-plus']" /> Add Book
        </button>
      </router-link>
      <table class="table table-striped table-light mt-4">
        <thead>
          <tr class="table-dark">
            <th class="text-center">No</th>
            <th class="text-center">ISBN</th>
            <th class="text-center">Judul</th>
            <th class="text-center">Pengarang</th>
            <th class="text-center">Tahun</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in books" :key="item.isbn">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.isbn }}</td>
            <td class="text-center">{{ item.judul }}</td>
            <td class="text-center">{{ item.pengarang }}</td>
            <td class="text-center">{{ item.tahun }}</td>
            <td class="text-center">
              <router-link :to="{ name: 'bukuview', params: { theisbn: item.isbn } }">
                <button type="button" class="btn btn-outline-success btn-sm">
                  <font-awesome-icon :icon="['fas', 'eye']" /> View
                </button>
              </router-link>
              <button type="button" @click="deleteDialog(item.isbn)" class="btn btn-outline-danger btn-sm">
                <font-awesome-icon :icon="['fas', 'trash']" /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}
.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.book-container {
  background-color: #e6eef9; /* Soft light gray background */
}
</style>
