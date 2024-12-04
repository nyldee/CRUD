<script setup>
import { ref, computed } from 'vue';
import FooterView from './views/FooterView.vue';
import MenuView from './views/MenuView.vue';
import { useRoute } from 'vue-router';

const theroute = useRoute();
const showNavbarFooter = computed(() => {
  return theroute.name !== 'login' && theroute.name !== 'register'; // Tidak tampilkan navbar/footer pada halaman login dan register
});
</script>

<template>
  <div class="container-fluid">
    <MenuView v-if="showNavbarFooter" />
    <div class="row" style="margin-top: 65px;">
      <router-view></router-view>
    </div>
    <FooterView v-if="showNavbarFooter" />
  </div>
</template>


