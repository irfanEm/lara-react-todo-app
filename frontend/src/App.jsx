import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "http://localhost:8000/api/todos";

  const loadTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (e) {
      setTodos([
        { id: 1, title: "Setup Laravel API", completed: false },
        { id: 2, title: "Build React Frontend", completed: true },
        { id: 3, title: "Dockerize Everything", completed: false },
      ]);
    }
  };

  useEffect(() => { loadTodos(); }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: input });
      setTodos([...todos, res.data]);
    } catch (e) {}
    setInput("");
  };

  const toggle = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const remove = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <div className="todo-card">
        <header>
          <h1>Todo App</h1>
          <p>Laravel + React + MySQL + Docker</p>
        </header>

        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty">No todos yet – add one!</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggle(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <button className="delete" onClick={() => remove(todo.id)}>
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;