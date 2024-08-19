<script setup>
//import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
//import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
</script>

<template>
  <header>
    <BHeader :isAuthenticated/>
  </header>

  <main>
    <!-- <LibraryRegistrationForm /> -->
    <!-- <JSONLab /> -->
     <router-view></router-view>
  </main>
</template>

<style scoped>
</style>
