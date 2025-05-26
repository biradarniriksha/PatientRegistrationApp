<template>
  <div class="app-container">
    <div class="form-card">
      <h1>Patient Registration App</h1>

      <form @submit.prevent="registerPatient">
        <label>Patient Name</label>
        <input v-model="name" placeholder="Enter patient name" required />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
        
        <label>Age</label>
        <input v-model.number="age" type="number" placeholder="Enter age" required />
        <span v-if="errors.age" class="error">{{ errors.age }}</span>
        
        <label>Gender</label>
        <select v-model="gender" required>
          <option disabled value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        
        <button type="submit">Register Patient</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useDb } from '../db/database'
import { broadcastUpdate, channel } from '../utils/sync'

const name = ref('')
const age = ref(null)
const gender = ref('')
const successMessage = ref('')
const errors = ref({ name: '', age: '' })

const validateForm = () => {
  let isValid = true
  errors.value = { name: '', age: '' }

  if (!name.value.trim()) {
    errors.value.name = 'Name is required.'
    isValid = false
  } else if (name.value.length < 3) {
    errors.value.name = 'Name must be at least 3 characters.'
    isValid = false
  }

  if (age.value === null || isNaN(age.value)) {
    errors.value.age = 'Age is required.'
    isValid = false
  } else if (age.value <= 0 || age.value > 120) {
    errors.value.age = 'Please enter a valid age (1–120).'
    isValid = false
  }

  return isValid
}

const registerPatient = async () => {
  if (!validateForm()) return

  const db = await useDb()
  await db.query(`
    INSERT INTO patients (name, age, gender)
    VALUES ('${name.value}', ${age.value}, '${gender.value}')
  `)

  name.value = ''
  age.value = null
  gender.value = ''
  successMessage.value = 'Patient successfully registered!'
  setTimeout(() => (successMessage.value = ''), 3000)
  window.dispatchEvent(new Event('patients-updated'))
  broadcastUpdate()
  console.log('Broadcast sent')
  console.log('Broadcast details:', {
  channelName: channel.name,
  messageType: 'patient-added'
});
}
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  padding: 20px; 
  min-height: 50vh;
  background-color: #f9f9f9;
}

.form-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 25px;
  margin-top: 2px; /* Manual top space */
  width: 90vw;
  max-width: 400px;
  box-sizing: border-box;
  transition: width 0.3s ease;
}

@media (min-width: 768px) {
  .form-card {
    max-width: 500px;
  }
}

@media (min-width: 1024px) {
  .form-card {
    max-width: 600px;
  }
}

h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

label {
  font-weight: 600;
  font-size: 14px;
  color: #555;
  text-align: left;
}

input,
select {
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 12px;
  font-size: 16px;
  background-color: #2d8cf0;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #1a6dc1;
}

.success {
  text-align: center;
  font-size: 14px;
  color: #28a745;
  margin-top: 10px;
}
.error {
  font-size: 12px;
  color: #e3342f;
  margin: -6px 0 10px;
}
</style>
