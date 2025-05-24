<template>
  <div class="container">
    <div class="card">
      <!-- <h2 class="title">Registered Patients</h2>

      < Patient Card View -->
      <!-- <ul class="patient-list">
        <li v-for="patient in patients" :key="patient.id" class="patient-card">
          <div class="patient-info">
            <div class="left">
              <p class="name">{{ patient.name }}</p>
              <p class="gender">{{ patient.gender }}</p>
            </div>
            <div class="right">
              <p class="age">{{ patient.age }} yrs</p>
            </div>
          </div>
        </li>
      </ul>  -->

      <!-- No Data Message -->
      <p v-if="!patients.length" class="no-data">No patients registered yet.</p>

      <!-- Results List Table View -->
      <div v-if="patients.length" class="results-section">
        <h3>Registered Patients</h3>
        <table class="results-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id">
              <td>{{ patient.id }}</td>
              <td>{{ patient.name }}</td>
              <td>{{ patient.gender }}</td>
              <td>{{ patient.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDb } from '../db/database'
import { channel } from '../utils/sync'

const patients = ref([])
let db = null

const fetchPatients = async () => {
  if (!db) db = await useDb()
  const result = await db.exec('SELECT * FROM patients ORDER BY id DESC')
  patients.value = result[0].rows
}

const handlePatientUpdate = () => {
  fetchPatients()
}

onMounted(async () => {
  await fetchPatients()
  window.addEventListener('patients-updated', handlePatientUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('patients-updated', handlePatientUpdate)
})

channel.addEventListener('message', (event) => {
  if (event.data?.type === 'patient-added') {
    fetchPatients()
  }
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 1px 16px;
  background-color: #f3f4f6;
  min-height: 50vh;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 5px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 24px;
  color: #2d3748;
  margin-bottom: 24px;
}

.patient-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.patient-card {
  padding: 16px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #fafafa;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.patient-card:hover {
  background-color:  #ffffff;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); */
}

.patient-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
}

.gender {
  font-size: 14px;
  color: #6b7280;
}

.age {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  white-space: nowrap;
}

.no-data {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  margin-top: 16px;
}

/* New Table Section */
.results-section {
  margin-top: 32px;
}

.results-section h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2d3748;
  text-align: center;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.results-table th,
.results-table td {
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  text-align: left;
}

.results-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.results-table tr:nth-child(even) {
  background-color: #f3f4f6;
}

.results-table tr:hover {
  background-color: #e0f2fe;
}

/* Responsive */
@media (max-width: 500px) {
  .patient-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .right {
    align-self: flex-end;
  }

  .results-table th,
  .results-table td {
    font-size: 12px;
    padding: 2px;
  }
}
</style>

