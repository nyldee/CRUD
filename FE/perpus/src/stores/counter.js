import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const pegawaiCounter = ref(0)
  const barangCounter = ref(0)

  function incrementPegawaiCounter() {
    pegawaiCounter.value++
  }

  function incrementBarangCounter() {
    barangCounter.value++
  }

  return { pegawaiCounter, barangCounter, incrementPegawaiCounter, incrementBarangCounter }
})

export const useUserStore = defineStore('user', () => {
  const email = ref('')
  const token = ref('')
  const thecounter = ref(0)

  function reset() {
    email.value = ''
    token.value = ''
    thecounter.value = 0
  }
  return { email, token, thecounter, reset }
})
