# Patient Registration App

A fully client-side Patient Registration App built with **Vue 3** and **PGlite** (SQLite in the browser). This app allows users to register patients, store their data persistently in-browser, and view them in a table.

---

## Features

- Register new patients (name, age, gender)
- View all registered patients
- Data is stored in-browser using [PGlite](https://electric-sql.github.io/pglite/)
- Cross-tab data synchronization using BroadcastChannel
- Responsive design with clean UI

---

## Live Demo

 [Visit App on Vercel](https://patient-registration-app-gamma.vercel.app/)

---

##  Installation & Setup

### Prerequisites

- **Node.js** (v16 or later recommended)
- **npm** (v8 or later)

### Clone the Repository

```bash
git clone https://github.com/biradarniriksha/PatientRegistrationApp.git
cd PatientRegistrationApp
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open your browser and navigate to:  
 `http://localhost:5173`

---

##  Challenges Faced

### 🔁 BroadcastChannel Communication

A custom event and `BroadcastChannel` were successfully implemented to sync patient data across components.  
The `patient-added` event is **dispatched** and **received properly**, triggering `fetchPatients()` as expected.

###  Database Persistence Issue

Despite using **PGlite** with `{ persist: true }`, the patient records do **not persist across page reloads**.  
All data appears to be stored **in-memory only**, and a full refresh clears it. This is under investigation.  
Potential causes include how **PGlite is initialized or scoped** within the browser environment.

---

##  Commit History Highlights

Each feature and major change was committed separately for clarity:

- `feat: setup Vue + PGlite with persistent database`
- `feat: add patient registration form`
- `feat: add patient List`
- `feat: add Raw query`
- `feat: implement BroadcastChannel for syncing`
- `feat: add responsive UI and styling`
- `docs: add README and deployment instructions`
