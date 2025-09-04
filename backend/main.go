package main

import (
    "encoding/json"
    "log"
    "net/http"
    "strings"
    "sync"
)

type Task struct {
    ID    int    `json:"id"`
    Title string `json:"title"`
    Done  bool   `json:"done"`
}

var (
    tasks  = []Task{} 
    nextID = 1
    mu     sync.RWMutex  
)
 
func enableCORS(w http.ResponseWriter, r *http.Request) bool {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Vary", "Origin")
    w.Header().Set("Access-Control-Max-Age", "86400")  

    if r.Method == http.MethodOptions {
        w.WriteHeader(http.StatusOK)
        return true
    }
    return false
}

func createTask(w http.ResponseWriter, r *http.Request) { 
    dec := json.NewDecoder(r.Body)
    dec.DisallowUnknownFields()
    var t Task
    if err := dec.Decode(&t); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    t.Title = strings.TrimSpace(t.Title)
    if t.Title == "" {
        http.Error(w, "title is required", http.StatusBadRequest)
        return
    }

    mu.Lock()
    t.ID = nextID
    nextID++
    tasks = append(tasks, t)
    mu.Unlock()

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    _ = json.NewEncoder(w).Encode(t)
}

func getTasks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    mu.RLock()
    defer mu.RUnlock()

    if len(tasks) == 0 { 
        w.Write([]byte("[]"))
        return
    }
    _ = json.NewEncoder(w).Encode(tasks)
}

func main() {
    http.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
        if handled := enableCORS(w, r); handled {
            return
        }

        switch r.Method {
        case http.MethodGet:
            getTasks(w, r)
        case http.MethodPost:
            createTask(w, r)
        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })

    log.Println("Server running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
