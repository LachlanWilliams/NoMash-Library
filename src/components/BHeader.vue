<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addBook" class="nav-link" active-class="active">
            Add Book
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li v-if="userRole === 'librarian'" class="nav-item">
          <router-link to="/LibrarianDashboard" class="nav-link" active-class="active">
            Librarian Dashboard
          </router-link>
        </li>
      </ul>
      <div v-if="isAuthenticated" class="d-flex align-items-center">
        <span class="me-3">User Role: {{ userRole }}</span>
        <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { isAuthenticated, userRole } from '@/router' // Import the reactive variables

const router = useRouter()
const auth = getAuth()

const logout = () => {
  console.log("User: ", auth.currentUser)
  signOut(auth).then(() => {
    console.log('User Role: ', userRole);
    isAuthenticated.value = false;
    userRole.value = '';
    router.push('/Logout');
  }).catch((error) => {
    console.log('Logout Error:', error);
  });
};
</script>

<style scoped>
/* Add your styles here */
</style>
