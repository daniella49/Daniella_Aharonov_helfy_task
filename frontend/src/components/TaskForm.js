import { useEffect, useState } from "react";

import "../styles/TaskForm.css";


function TaskForm({
  onSubmit,
  editingTask
}) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium"
  });


  // Load task data when editing
  useEffect(() => {

    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority
      });
    } 

    else {
      setFormData({
        title: "",
        description: "",
        priority: "medium"
      });
    }

  }, [editingTask]);


  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }



  function handleSubmit(e) {

    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    onSubmit(formData);

    if (!editingTask) {
      setFormData({
        title: "",
        description: "",
        priority: "medium"
      });
    }

  }


  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >

      <h2>
        {
          editingTask
            ? "Edit Task"
            : "Add Task"
        }
      </h2>


      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
      />


      <textarea
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
      />


      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >

        <option value="low">
          Low
        </option>
        
        <option value="medium">
          Medium
        </option>

        <option value="high">
          High
        </option>

      </select>


      <button type="submit">
        {
          editingTask
            ? "Update Task"
            : "Add Task"
        }
      </button>


    </form>
  );
}

export default TaskForm;