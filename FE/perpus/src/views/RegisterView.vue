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
const email = ref('');
const password = ref('');
const store = useUserStore();

const customConfig = {
  'Content-Type': 'application/json',
};

const bodyParameters = computed(() => {
  return { 'name': username.value, 'email': email.value, 'password': password.value };
});

function register() {
  axios({
    url: 'http://localhost:8000/api/register',
    method: 'post',
    data: bodyParameters.value,
    headers: customConfig
  }).then(response => {
    auth.value = response.data;
    console.log(response.data); // Only for development
    if (auth.value.success === true) {
      store.email = email.value;
      store.token = auth.value.data;
      store.thecounter++;
      therouter.push('/menu');
    }
  }).catch(error => {
    console.log('AJAX' + error);
  });
}
</script>

<template>
  <div class="register-container rounded-4" style="height: 100% ; width: 60vh; background-color: #99ace0;">
    <h1 class="text-center text-white border-bottom border-dark border-2">REGISTER</h1>
    <form @submit.prevent="register">
      <div class="form-group mb-3 mt-3">
        <label for="exampleFormControlInput1" class="form-label m-1 fw-bold" style="color: #f3f4fb;">Username</label>
        <input type="username" v-model="username" required class="form-control" id="exampleFormControlInput1" placeholder="Username" style="background-color: #f3f4fb; color: #fff;">
      </div>
      <div class="form-group mb-3 mt-3">
  <label for="exampleFormControlInput1" class="form-label m-1 fw-bold" style="color: #f3f4fb;">Email</label>
  <input type="email" v-model="email" required class="form-control" id="exampleFormControlInput1" placeholder="Email" style="background-color: #f3f4fb; color: #fff;">
</div>
      <div class="form-group mb-4">
        <label for="exampleFormControlInput1" class="form-label m-1 fw-bold" style="color: #f3f4fb;">Password</label>
        <input type="password" v-model="password" required class="form-control" id="exampleFormControlInput1" placeholder="Password" style="background-color: #f3f4fb; color: #fff;">
      </div>
      <div class="d-grid gap-1">
        <button type="submit" class="btn border border-3 mt-3 fw-bold" style="background-color: #acb8e4; color: #f3f4fb; ">REGISTER</button>
      </div>
    </form>
    <p v-if="auth && !auth.success">{{ auth.message }}</p>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 15px;
}
</style>
