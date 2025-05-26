<template>
  <div class="app">
    <PatientForm />
    <PatientList />
    <RawQuery />
  </div>
</template>

<script setup>
import PatientForm from './components/PatientForm.vue'
import PatientList from './components/PatientList.vue'
import RawQuery from './components/RawQuery.vue';
</script>

<style>
.app {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 40px;
  font-family: 'Segoe UI', sans-serif;
}
</style>
