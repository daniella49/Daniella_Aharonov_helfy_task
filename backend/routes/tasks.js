const express = require("express");
const validTask = require("../middleware/validTask");

const router = express.Router();


let tasks = [
  {
    id: 1,
    title: "Build an app",
    description: "Build a React and Express app",
    completed: false,
    createdAt: new Date(),
    priority: "high"
  },
  {
    id: 2,
    title: "Grocery shopping",
    description: "Get cheese and crackers",
    completed: true,
    createdAt: new Date(),
    priority: "low"
  },
  {
    id: 3,
    title: "Gym",
    description: "Go to the gym",
    completed: false,
    createdAt: new Date(),
    priority: "medium"
  }
];


let nextId = 4;

// Gets all tasks
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});


// Create a new task
router.post("/", validTask, (req, res) => {

  const { title, description, priority } = req.body;


  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
    priority
  };


  tasks.push(newTask);


  res.status(201).json(newTask);
});


// Update a task
router.put("/:id", validTask, (req, res) => {

  const taskId = parseInt(req.params.id);

  const task = tasks.find(
    (t) => t.id === taskId
  );


  if (!task) {
    return res.status(404).json({
      message: "Task not found."
    });
  }


  const {
    title,
    description,
    priority
  } = req.body;


  task.title = title;
  task.description = description || "";
  task.priority = priority;

  if (typeof req.body.completed === "boolean") {
  task.completed = req.body.completed;
}
  


  res.status(200).json(task);

});


// Delete a task
router.delete("/:id", (req, res) => {

  const taskId = parseInt(req.params.id);


  const taskIndex = tasks.findIndex(
    (t) => t.id === taskId
  );


  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found."
    });
  }


  const deletedTask = tasks.splice(
    taskIndex,
    1
  );


  res.status(200).json(deletedTask[0]);

});


// Toggle if task is completed
router.patch("/:id/toggle", (req, res) => {

  const taskId = parseInt(req.params.id);


  const task = tasks.find(
    (t) => t.id === taskId
  );


  if (!task) {
    return res.status(404).json({
      message: "Task not found."
    });
  }


  task.completed = !task.completed;


  res.status(200).json(task);

});


module.exports = router;