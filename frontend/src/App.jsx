import React, { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  // Extraer token JWT del query string y guardarlo
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);
      // Limpiar URL para no mostrar token
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, []);

  // Cargar tareas si hay token
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const login = () => {
    // Redirigir al backend para iniciar login
    window.location.href = `${API_BASE}/auth/login`;
  };

  const logout = () => {
    // Elimina el token localmente
    localStorage.removeItem("token");
    setToken(null);
  
    // Redirige al backend para cerrar sesión en Auth0 y luego volver al frontend
    const returnTo = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/logout?returnTo=${encodeURIComponent(returnTo)}`;
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      } else {
        // Si token inválido, limpiar sesión
        logout();
      }
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (res.ok) {
        setNewTitle("");
        fetchTodos();
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });
      if (res.ok) fetchTodos();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) fetchTodos();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  if (!token) {
    return <button onClick={login}>Iniciar sesión</button>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <button onClick={logout} style={{ marginBottom: 20 }}>
        Cerrar sesión
      </button>

      <h1>Lista de Tareas</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{ width: "80%", padding: 8 }}
        />
        <button onClick={addTodo} style={{ padding: "8px 16px", marginLeft: 8 }}>
          Agregar
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(({ id, title, completed }) => (
          <li
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              background: "#f9f9f9",
              padding: 10,
              borderRadius: 4,
            }}
          >
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleTodo(id, completed)}
            />
            <span
              style={{
                flex: 1,
                marginLeft: 8,
                textDecoration: completed ? "line-through" : "none",
              }}
            >
              {title}
            </span>
            <button
              onClick={() => deleteTodo(id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                borderRadius: 4,
              }}
              aria-label={`Eliminar tarea ${title}`}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
