<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/counter'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const therouter = useRouter();
const auth = ref(null);
const username = ref('');
const password = ref('');
const store = useUserStore();
const dynamicBackgroundColor = ref('#99ace0'); // Warna default background

const customConfig = {
  'Content-Type': 'application/json',
};

const bodyParameters = computed(() => {
  return { 'email': username.value, 'password': password.value };
});

function login() {
  axios({
    url: 'http://localhost:8000/api/login',
    method: 'post',
    data: bodyParameters.value,
    headers: customConfig
  }).then(response => {
    auth.value = response.data;
    console.log(response.data); // Only for development
    if (auth.value.success === true) {
      store.email = username.value;
      store.token = auth.value.data;
      store.thecounter++;
      therouter.push('/home');
    }
  }).catch(error => {
    console.log('AJAX' + error);
  });
}
</script>

<template>
  <div 
    class="login-container rounded-4 border border-4"
    :style="{ height: '100%', width: '60vh', backgroundColor: dynamicBackgroundColor }">
    <h1 class="text-center text-white border-bottom border-dark border-2" style="border-color: #252941; color: #f3f4fb;">LOGIN</h1>
    <form @submit.prevent="login">
      <div class="form-group mb-3 mt-3">
        <label for="exampleFormControlInput1" class="form-label m-1 fw-bold" style="color: #f3f4fb;">Email</label>
        <input type="email" v-model="username" required class="form-control" id="exampleFormControlInput1" placeholder="Email">
      </div>
      <div class="form-group mb-4">
        <label for="exampleFormControlInput1" class="form-label m-1 fw-bold" style="color: #f3f4fb;">Password</label>
        <input type="password" v-model="password" required class="form-control" id="exampleFormControlInput1" placeholder="Password">
      </div>
      <div class="d-grid gap-1">
        <button type="submit" class="btn border border-3 mt-3 fw-bold" style="background-color: #acb8e4; color: #f3f4fb; " id="loginbtn">LOGIN</button>
        <p class="mt-2 mx-1">Don't have an account ? <router-link to="/register" style="color: #f3f4fb; text-decoration: none">Register Here</router-link></p>
      </div>
    </form>
    <p v-if="auth && !auth.success">{{ auth.message }}</p>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#loginbtn:hover {
  scale: 1.05;
  transition: 0.5s;
}

.login-container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}
</style>
