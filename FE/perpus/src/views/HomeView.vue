<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToMenu() {
  router.push('/menu')
}

function goToPegawai() {
  router.push('/pegawai')
}

function goToBarang() {
  router.push('/barang')
}

function goToBuku() {
  router.push('/buku')
}
</script>

<template>
  <div class="container mt-1">
    <!-- Kotak untuk Perpustakaan dan tombol -->
    <div class="card p-4">
      <h1 class="text-center text-white border-bottom border-dark border-2" style="border-color: #252941; color: #f3f4fb;">PERPUSTAKAAN</h1>
      <!-- Tombol navigasi vertikal -->
      <div class="d-flex flex-column align-items-center gap-3">
        <button @click="goToPegawai" class="form-label m-1 fw-bold" style="width: 200px;">PEGAWAI</button>
        <button @click="goToBarang" class="form-label m-1 fw-bold" style="width: 200px;">BARANG</button>
        <button @click="goToBuku" class="form-label m-1 fw-bold" style="width: 200px;">BUKU</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Warna tombol Pegawai */
.btn-pegawai {
  background-color: #f3f4fb;
  color: #252941;
  border: none;
  transition: transform 0.3s;
}

.btn-pegawai:hover {
  transform: scale(1.1);
}

/* Warna tombol Barang */
.btn-barang {
  background-color: #f3f4fb;
  color: #252941;
  border: none;
  transition: transform 0.3s;
}

.btn-barang:hover {
  transform: scale(1.1);
}

/* Warna tombol Buku */
.btn-buku {
  background-color: #f3f4fb;
  color: #252941;
  border: none;
  transition: transform 0.3s;
}

.btn-buku:hover {
  transform: scale(1.1);
}

/* Styling untuk card */
.card {
  height: '100%';
  width: '60vh';
  border-radius: 8px;
  border: 1px solid #f3f4fb;
  background-color: #99ace0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
