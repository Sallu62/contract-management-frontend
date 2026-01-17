# Contract Management Platform (Frontend)

This project is a **frontend-only Contract Management Platform** built as part of an interview assignment.  
The goal of the application is to demonstrate **product thinking**, **state management**, and **clean frontend architecture** without relying on a backend service.

The application allows users to create reusable contract templates (Blueprints), generate contracts from those templates, and manage contracts through a controlled lifecycle.

---

## 🚀 Features

### 1. Blueprint Creation
- Create reusable contract blueprints (templates)
- Blueprints act as the base structure for contracts
- Each blueprint can later be used to generate multiple contracts

### 2. Contract Creation
- Generate contracts from existing blueprints
- Each contract inherits data from its selected blueprint
- Contracts are initialized with a default lifecycle state

### 3. Contract Lifecycle Management
Each contract follows a **strict lifecycle flow**:


- Lifecycle steps cannot be skipped
- Contracts can be **Revoked** after creation or after being sent
- Locked contracts are read-only
- Revoked contracts cannot proceed further

### 4. Contract Dashboard
- Central dashboard to view all contracts
- Displays:
  - Contract name
  - Blueprint name
  - Current status
  - Created date
- Action buttons are dynamically enabled based on contract status

---

## 🧱 Architecture & Design Decisions

- **Component-based architecture** is used to keep the UI modular and maintainable
- **Centralized state management** is implemented using React Context and Reducer
- Contract lifecycle rules are enforced at the state level to avoid invalid transitions
- No backend or database is used; all data is managed on the frontend

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Context API + useReducer**
- **Vite** (for fast development build)

---

## 📁 Project Structure



This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install vite@latest`
2. Run the app:
   `npm run dev`
