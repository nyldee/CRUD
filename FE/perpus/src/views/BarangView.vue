<script setup>
import { useCounterStore } from '../stores/counter'

const store = useCounterStore()

function increase() {
  store.incrementBarangCounter()
}
</script>

<template>
  <div class="rounded-2 d-flex flex-column justify-content-center align-items-center" style="width: 100%; height: 100%; background-color: #99ace0;">
    <h3 class="text-light text-center m-5">STOK BARANG : {{store.barangCounter}}</h3>
    <button type="button" @click="increase()" class="btn mt-5 fw-bold" style="width: 75%; background-color: #6673c5; color: #f3f4fb;">
      COUNTER IN BARANG
    </button>
    <p class="text-light text-center m-4">Click to increase THE COUNTER</p>
  </div>
</template>

<style scope>
.btn:hover {
  scale: 1.1;
  transition: 0.7s;
}

</style>

