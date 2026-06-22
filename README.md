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
taskify_apis/
├── sql/
│   ├── migrations/001_initial_schema.sql
│   └── seeds/001_seed_data.sql
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .env.example
└── package.json

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

## Screenshots
(Add screenshots of login, task list, and profile screens here)

MIT License © 2026 Sammy Mutisya Kivaki
