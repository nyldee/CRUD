import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import Login from '@/views/Login.vue'
import PegawaiView from '@/views/PegawaiView.vue'
import BarangView from '@/views/BarangView.vue'
import BukuView from '@/views/BukuView.vue'
import FormBukuView from '@/views/FormBukuView.vue' // Import FormBukuView
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    
    {
      path: '/barang',
      name: 'barang',
      component: BarangView,
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      component: PegawaiView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/buku',
      name: 'buku',
      component: BukuView,
    },
    {
      path: '/formbuku', // Route for adding a book
      name: 'formbuku',
      component: FormBukuView,
    },
    {
      path: '/bukuview/:theisbn',
      name: 'bukuview',
      component: FormBukuView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
