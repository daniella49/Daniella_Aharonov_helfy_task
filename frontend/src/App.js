import { useEffect, useState } from "react";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "./services/api";

import "./styles/App.css";


function App() {

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");

  const [editingTask, setEditingTask] = useState(null);


  // Additional features
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("date");

  const [theme, setTheme] = useState("light");


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {
    loadTasks();
  }, []);


  async function loadTasks() {
    try {

      setLoading(true);

      const data = await getTasks();

      setTasks(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }


  async function handleCreate(task) {

    try {

      const newTask = await createTask(task);

      setTasks((prev) => [
        ...prev,
        newTask
      ]);

    } catch (err) {

      setError(err.message);

    }
  }


  async function handleUpdate(id, task) {

    try {

      const updatedTask = await updateTask(id, task);

      setTasks((prev) =>
        prev.map((item) =>
          item.id === id
            ? updatedTask
            : item
        )
      );

      setEditingTask(null);

    } catch (err) {

      setError(err.message);

    }
  }


  async function handleDelete(id) {

    if (!window.confirm("Delete this task?")) {
      return;
    }


    try {

      await deleteTask(id);

      setTasks((prev) =>
        prev.filter(
          (task) => task.id !== id
        )
      );

    } catch (err) {

      setError(err.message);

    }
  }


  async function handleToggle(id) {

    try {

      const updatedTask = await toggleTask(id);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? updatedTask
            : task
        )
      );

    } catch (err) {

      setError(err.message);

    }
  }


  // Search + filter + sorting
  const filteredTasks = tasks
    .filter((task) => {

      if (filter === "completed") {
        return task.completed;
      }

      if (filter === "pending") {
        return !task.completed;
      }

      return true;

    })
    .filter((task) => {

      const text =
        `${task.title} ${task.description}`
          .toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    })
    .sort((a, b) => {


      if (sortBy === "title") {

        return a.title.localeCompare(
          b.title
        );

      }


      if (sortBy === "priority") {

        const priorityOrder = {
          high: 1,
          medium: 2,
          low: 3
        };


        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );

      }


      // newest first
      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );

    });



  return (

    <div className={`app ${theme}`}>

      <h1>
        Task Manager
      </h1>


      {error && (

        <div className="error">
          {error}
        </div>

      )}



      <div className="controls">


        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="date">
            Sort by Date
          </option>

          <option value="priority">
            Sort by Priority
          </option>

          <option value="title">
            Sort by Title
          </option>

        </select>


        <button
          onClick={() =>
            setTheme(
              theme === "light"
                ? "dark"
                : "light"
            )
          }
        >

          {
            theme === "light"
              ? "🌙 Dark"
              : "☀️ Light"
          }

        </button>


      </div>



      <TaskForm

        onSubmit={
          editingTask
            ? (task) =>
                handleUpdate(
                  editingTask.id,
                  task
                )
            : handleCreate
        }

        editingTask={editingTask}

      />



      <TaskFilter

        filter={filter}

        setFilter={setFilter}

      />



      {
        loading

        ?

        <p>
          Loading tasks...
        </p>

        :

        <TaskList

          tasks={filteredTasks}

          onDelete={handleDelete}

          onToggle={handleToggle}

          onEdit={setEditingTask}

        />

      }


    </div>

  );
}


export default App;