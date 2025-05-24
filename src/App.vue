<template>
  <div class="app">
    <!-- <h1>Patient Registration</h1> -->
    <PatientForm />
    <PatientList />
    <RawQuery />
  </div>
</template>

<script setup>
import PatientForm from './components/PatientForm.vue'
import PatientList from './components/PatientList.vue'
import RawQuery from './components/RawQuery.vue';
import { useDb } from './db/database'
import { onMounted } from 'vue'

onMounted(async () => {
  const db = await useDb()

  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await db.exec(`
    INSERT INTO patients (name, age, gender)
    VALUES ('Inserted from App.vue', 33, 'Male');
  `)

  console.log('✅ Patient inserted')
})
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

<!-- <script setup>

</script> -->