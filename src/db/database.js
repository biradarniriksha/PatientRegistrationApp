import { PGlite } from '@electric-sql/pglite';

let dbInstance = null;
let initPromise = null;

export const useFreshDb = async () => {
  const db = new PGlite({
    id: 'patient-db',
    persist: true
  })
  await db.waitReady
  await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          gender TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
  return db
}

export const useDb = async () => {
  if (dbInstance) return dbInstance;
  if (initPromise) return await initPromise;

  initPromise = (async () => {
    try {
      dbInstance = new PGlite({
        id: 'patient-db',
        persist: true
      });

      await dbInstance.waitReady;

      await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          gender TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      return dbInstance;
    } catch (error) {
      console.error('Database initialization failed:', error);
      dbInstance = null;
      initPromise = null;
      throw error;
    }
  })();

  return await initPromise;
};