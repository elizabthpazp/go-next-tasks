"use client";

import './globals.css';
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // Fetch tasks
  const fetchTasks = async () => {
  setLoading(true);
  setError("");
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data: Task[] = await res.json();
    setTasks(data ?? []); 
  } catch (err: any) {
    setError(err.message);
    setTasks([]);  
  } finally {
    setLoading(false);
  }
}; 

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, done: false }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask: Task = await res.json();
      setTasks([...tasks, newTask]);
      setTitle("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle task done locally
  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="p-8 font-sans max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Task List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={addTask}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
        >
          Add
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
              className="w-4 h-4 accent-purple-600"
            />
            <span className={task.done ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
