"use client";

import "./globals.css";
import { useState, useEffect, useMemo, useCallback } from "react";

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
  const fetchTasks = useCallback(async () => {
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
  }, [API_URL]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add new task
  const addTask = useCallback(async () => {
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
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL, title]);

  // Toggle task done locally
  const toggleDone = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  // Derived values with useMemo
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );
  const totalTasks = useMemo(() => tasks.length, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {totalTasks > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedTasks} of {totalTasks}
                </p>
              </div>
              <div className="flex-1 max-w-xs ml-6">
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
                        }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-gray-500">
                  {totalTasks > 0
                    ? Math.round((completedTasks / totalTasks) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full pl-4 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  onKeyPress={(e) => e.key === "Enter" && addTask()}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
              <button
                onClick={addTask}
                disabled={loading || !title.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 mx-6 mt-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {loading && tasks.length === 0 && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center">
                <svg
                  className="w-6 h-6 animate-spin text-blue-600 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-gray-600 font-medium">
                  Loading your tasks...
                </span>
              </div>
            </div>
          )}

          {tasks.length > 0 && (
            <div className="divide-y divide-gray-100">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`p-6 hover:bg-gray-50 transition-all duration-200 ${task.done ? "bg-gray-50/50" : ""
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleDone(task.id)}
                        className="peer w-6 h-6 appearance-none rounded-lg border-2 border-gray-300 checked:border-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
                      />
                      {task.done && (
                        <svg
                          className="w-4 h-4 text-blue-600 absolute top-1 left-1 pointer-events-none"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-lg font-medium transition-all duration-200 ${task.done
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                          }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && tasks.length === 0 && !error && (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Start by adding your first task above. Stay organized and get
                things done!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
