<template>
  <div class="container">
    <div class="card">
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
  const result = await db.query('SELECT * FROM patients ORDER BY id DESC')
  console.log('Patients fetched:', result.rows)
  patients.value = result.rows
}

const handlePatientUpdate = () => {
  console.log('Window Event: patients-updated triggered')
  fetchPatients()
}

const handleChannelMessage = (event) => {
  console.log('Received via channel:', event.data)
  if (event.data?.type === 'patient-added') {
    console.log('Broadcast received:', event.data)
    fetchPatients()
  }
}

onMounted(async () => {
  console.log('Component mounted')
  await fetchPatients()
  console.log('Initial patients loaded:', patients.value)

  window.addEventListener('patients-updated', handlePatientUpdate)
  channel.addEventListener('message', handleChannelMessage)

  console.log('BroadcastChannel listener added')
})

onBeforeUnmount(() => {
  console.log('Component unmounting, removing listeners')
  window.removeEventListener('patients-updated', handlePatientUpdate)
  channel.removeEventListener('message', handleChannelMessage)
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 1px 10px;
  background-color: #f9f9f9;
  min-height: 50vh;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 10px 25px;
  max-width: 600px;
  width: 90vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  margin: 24px auto;
  padding: 20px;
}

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

