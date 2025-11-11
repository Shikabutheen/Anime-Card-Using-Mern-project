# 🌸 Anime Card Creator

A **Full-Stack MERN Project** where users can **create, update, and delete Anime Cards** with thumbnails (images).  
All images are uploaded to **Cloudinary** for secure and permanent storage.

This project is deployed using **Render** — one service hosts your backend (API), and another hosts your frontend (React).

---

## 🧭 Project Overview

This web app allows you to:
1. Create a new anime card (title, description, anime name, power, image).
2. View all existing cards.
3. Update a card's details and image.
4. Delete any card.
5. Upload images directly to **Cloudinary** — so they don’t disappear even after deployment.

It’s perfect for learning **full-stack CRUD (Create, Read, Update, Delete)** operations.

---

## 🧰 Tech Stack Explanation

### 🖥️ Frontend (React + Tailwind)
- **React** → UI building framework.
- **Vite** → Fast development server for React.
- **Tailwind CSS** → Utility-first CSS for styling.
- **Axios** → For making API requests to the backend.
- **React Router DOM** → For page navigation (e.g., Home → Add Page).

### ⚙️ Backend (Node.js + Express)
- **Express.js** → Handles API routes like `/create`, `/get`, `/update`, `/delete`.
- **Mongoose** → Connects Node.js with MongoDB and defines schemas.
- **Multer** → Handles file uploads (in-memory for Cloudinary).
- **Cloudinary** → Stores images online permanently.
- **dotenv** → Loads environment variables from `.env`.
- **CORS** → Allows frontend (React) to talk to backend securely.

### ☁️ Database
- **MongoDB Atlas** → Stores your card data (title, description, image URL, etc.).

---

## 🗂️ Folder Structure Explained

anime-card-creator/
│
├── backend/ # Node.js + Express API
│ ├── models/ # MongoDB schemas (Card model)
│ ├── routes/ # API routes (CRUD endpoints)
│ ├── controllers/ # Logic for handling requests
│ ├── utils/ # Helper files (e.g., Cloudinary upload)
│ ├── index.js # Main server file
│ └── package.json # Backend dependencies
│
├── frontend/ # React (Vite) app
│ ├── src/ # Components, pages, context, etc.
│ ├── public/ # Static files
│ ├── vite.config.js # Vite config + backend proxy
│ └── package.json # Frontend dependencies
│
└── README.md

