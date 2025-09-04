# 📝 Go Tasks API

A simple **Go REST API** to manage tasks (to-do list).  
Includes endpoints to create and list tasks in memory. 🚀

---

## ✨ Features
- Create tasks (`POST /tasks`)
- List all tasks (`GET /tasks`)
- Concurrency-safe with `sync.Mutex`
- **CORS support** for Next.js frontend

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/go-tasks.git
   cd go-tasks
   ```

2. Run the server:
  ```bash
   go run main.go
   ```

## 📡 Endpoints
  - ➕ Create a task
  - POST /tasks
  - Content-Type: application/json

## Example body:

  ```bash
  { "title": "Finish the test", "done": false }
  ```

## Example response:

  ```bash
  { "id": 1, "title": "Finish the test", "done": false }
  ```

## 📋 Get all tasks

  - GET /tasks

## Example response:
  ```bash
  [
   { "id": 1, "title": "Finish the test", "done": false }
  ]
  ```

## ⚡ Tech Stack

  - Go 1.21+
  - net/http (standard library)
  - sync.Mutex for concurrency

## 👩‍💻 Author

  Built with 💜 by elizabthpazp