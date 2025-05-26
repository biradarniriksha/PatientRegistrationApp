<template>
  <div class="sql-runner">
    <h3>Run SQL Query</h3>
    <textarea v-model="query" rows="3" placeholder="Enter SQL query here..."></textarea>
    <button @click="runQuery">Run Query</button>

    <div v-if="error" class="error">Query error: {{ error }}</div>
    
    <table v-if="results.length">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in results" :key="row.id">
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDb } from '../db/database'

const query = ref('SELECT id, name, age, gender FROM patients;')
const results = ref([])
const columns = ref([])
const error = ref('')
let db = null

const runQuery = async () => {
  try {
    if (!db) db = await useDb()
    console.log(query.value)
    const result = await db.exec(query.value)
    console.log(result)

    if (result.length > 0 && result[0].fields && result[0].rows) {
      // Extract column names from the fields metadata
      columns.value = result[0].fields.map(field => field.name)

      // Convert row arrays into objects using the column names
      results.value = result[0].rows.map(row =>
        Object.fromEntries(columns.value.map((col, i) => [col, row[col]]))
      )
      error.value = ''
    } else {
      results.value = []
      error.value = 'No results.'
    }
  } catch (err) {
    error.value = err.message
    results.value = []
  }
}
</script>

<style scoped>
.sql-runner {
  margin-top: 20px;
}
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
table {
  width: 100%;
  padding: 8px;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #ccc;
  padding: 6px;
  text-align: left;
}
</style>
