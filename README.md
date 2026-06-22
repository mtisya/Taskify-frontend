# Taskify Frontend (Expo + React Native)

Taskify Frontend is the mobile client for the **Taskify API**, built with Expo Router and React Native.  
It provides a clean UI for authentication, task management, and profile editing.

---

## ✨ Features
- 🔐 User authentication (register, login, logout, social login)
- 📋 Task management (create, list, update, delete)
- 👤 Profile management (view & edit user profile)
- 🌐 Secure API integration with Axios interceptors
- 📱 Expo Router navigation with `(auth)`, `(tasks)`, `(profile)` flows
- 🎨 Reusable UI components (TaskCard, InputField, Button)

---

## 📂 Project Structure
Taskify-frontend/
├── app/                     # Expo Router screens
│   ├── (auth)/              # Authentication flow
│   ├── (tasks)/             # Task dashboard flow
│   ├── (profile)/           # User profile flow
│   └── _layout.tsx          # Navigation layout
├── components/              # Reusable UI components
├── context/                 # Global state (AuthContext, TaskContext)
├── services/                # API calls (api.ts, auth.ts, tasks.ts)
├── utils/                   # Helpers (validators, storage)
├── assets/                  # Images, fonts
├── .env.example             # Environment template
└── README.md


---

## ⚙️ Requirements
- Node.js ≥ 18
- Expo CLI
- React Native ≥ 0.81
- Backend API running (see [Taskify API](https://github.com/<your-username>/Taskify-api))

---

## 🚀 Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/Taskify-frontend.git
   cd Taskify-frontend
2. Install dependencies
   npm install
   
3. Run the app:
   npm start
   
## 🔧 Environment Setup

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env

## Backend Integration
This frontend consumes the Taskify API (github.com (https://github.com/spearhead-inc/taskify-apis).
Make sure the backend is running locally or deployed before using the app.

## 📸 Screenshots

### 🔐 Login Screen
![Login Screen](./assets/Mutisya.jpg)

### 📋 Task List
![Task List](./assets/screenshots/tasks.png)

### 👤 Profile Screen
![Profile Screen](./assets/screenshots/profile.png)

## 🛠 Engineering Breakdown: State Management

### 🎯 Chosen Pattern
We implemented **React Context + Reducer pattern** for global state management.

- **AuthContext** → handles authentication state (tokens, login/logout).
- **TaskContext** → manages task data (list, create, update, delete).
- Both contexts wrap the app so child components can consume state without prop‑drilling.

---

### ⚖️ Architectural Trade‑offs

**Pros**
- ✅ Simplicity: Context API is built into React, no external dependencies like Redux.
- ✅ Scoped state: Auth and Task contexts are isolated, reducing coupling.
- ✅ Async integration: Works smoothly with Axios interceptors and SecureStore.
- ✅ Lightweight: Ideal for small to mid‑sized apps without complex state graphs.

**Cons**
- ⚠️ Re‑render overhead: Context updates can trigger re‑renders across all consumers.
- ⚠️ Scaling limits: As the app grows, debugging and performance tuning may be harder compared to Redux or Zustand.
- ⚠️ No devtools: Lacks advanced debugging tools available in Redux ecosystem.
- ⚠️ Persistence complexity: Requires manual handling of token persistence (SecureStore) and hydration on app start.

---

### 🧩 Why This Trade‑off Works for Taskify
- The app’s state is relatively simple (auth + tasks).
- Context keeps the architecture **clean and easy to reason about**.
- Avoids over‑engineering with Redux for a project that doesn’t need heavy middleware.
- Future scaling can migrate to Redux Toolkit or Zustand if performance bottlenecks appear.



MIT License © 2026 Sammy Mutisya Kivaki
