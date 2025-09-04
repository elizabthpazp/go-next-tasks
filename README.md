# 📝 Go Tasks Fullstack App (Monorepo)

A fullstack **task manager app** built with **Go** (backend) and **Next.js + TypeScript + TailwindCSS** (frontend).
Allows creating, listing, and marking tasks as done. ✅

This monorepo unifies both projects for easier development, version control, and deployment.

---

## 📂 Project Structure

```
go-next-tasks/
│
├── backend/             # Go API
│   ├── main.go
│   └── README.md
│
├── frontend/            # Next.js + TypeScript + Tailwind frontend
│   ├── app/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── .env.local
│   └── README.md
│
├── README.md            
└── .gitignore
```

---

## 🚀 Running the Project

### 1️⃣ Backend (Go API)

1. Open a terminal and go to the backend folder:

   ```bash
   cd backend
   ```
2. Run the server:

   ```bash
   go run main.go
   ```
3. The API will be available at:

   ```
   http://localhost:8080/tasks
   ```

### 2️⃣ Frontend (Next.js)

1. Open another terminal and go to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   pnpm install
   ```
3. Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/tasks
   ```
4. Start the development server:

   ```bash
   pnpm run dev
   ```
5. Open in your browser 👉 [http://localhost:3000](http://localhost:3000)

---

## 📝 Features

### Backend

* Create tasks (`POST /tasks`)
* List all tasks (`GET /tasks`)
* Concurrency-safe with `sync.Mutex`
* CORS support for frontend

### Frontend

* Add, list, and mark tasks as completed
* Loading and error handling
* Modern UI with TailwindCSS
* TypeScript for type safety
* Environment variables for API URL

---

## ⚡ Tech Stack

* **Backend:** Go, `net/http`, CORS
* **Frontend:** Next.js 13, React, TypeScript, TailwindCSS
* **Package Manager:** pnpm

---

## 🛠 Possible Improvements with more time

### Backend Improvements

* **Persistence:** Replace in-memory storage with a database (PostgreSQL, SQLite, or MongoDB)
* **Testing:** Unit tests, integration tests, and API tests
* **Architecture:** Use layered architecture (controllers → services → repositories)
* **Validation & Error Handling:** Validate input and improve error responses
* **Authentication:** Add JWT or OAuth for user-based task management
* **Logging:** Structured logging with log levels

### Frontend Improvements

* **State Management:** Use React Query, Redux, or Zustand for better state handling
* **Task Editing & Deletion:** Allow updating or deleting tasks
* **Responsive Design:** Improve layout for mobile and tablet
* **UI/UX:** Animations, drag-and-drop tasks, notifications
* **Testing:** Unit tests and integration tests for components and pages
* **Error Handling:** Global error boundaries and better UX for API errors

### Fullstack / DevOps

* **Dockerization:** Containerize backend and frontend for easier deployment
* **CI/CD:** Setup GitHub Actions or other pipelines for testing and deployment
* **Monorepo Tools:** Use pnpm workspaces for better dependency management
* **Deployment:** Deploy backend and frontend to a cloud provider (Vercel, Heroku, AWS)
* **Monitoring:** Add performance monitoring, logging, and alerts

---

## 👩‍💻 Author

Built with 💜 by [elizabthpazp](https://github.com/elizabthpazp)

---

## 🔗 Resources

* [Go](https://go.dev/)
* [Next.js](https://nextjs.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [pnpm](https://pnpm.io/)
