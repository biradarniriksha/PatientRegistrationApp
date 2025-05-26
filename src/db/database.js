import { PGlite } from '@electric-sql/pglite'

let dbInstance = null
let initPromise = null

const createTables = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
}


const initializeDb = async (id = 'patient-db') => {
  const db = new PGlite({ id, persist: true })
  await db.waitReady
  await createTables(db)
  return db
}

export const useFreshDb = async () => {
  return await initializeDb(`patient-db-${Date.now()}`) // ensures uniqueness
}

export const useDb = async () => {
  if (dbInstance) return dbInstance
  if (initPromise) return await initPromise

  initPromise = (async () => {
    try {
      dbInstance = await initializeDb('patient-db')
      return dbInstance
    } catch (err) {
      console.error('Failed to initialize database:', err)
      dbInstance = null
      initPromise = null
      throw err
    }
  })()

  return await initPromise
}
