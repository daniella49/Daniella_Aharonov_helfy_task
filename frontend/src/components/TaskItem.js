import "../styles/TaskItem.css";

function TaskItem({
  task,
  onDelete,
  onToggle,
  onEdit
}) {

  return (
    <div className="task-card">

      <div className="task-header">

        <h2>
          {task.title}
        </h2>

        <span
          className={`priority ${task.priority}`}
        >
          {task.priority}
        </span>

      </div>


      <p className="description">
        {task.description}
      </p>


      <p className={
        task.completed
          ? "completed"
          : "pending"
      }>
        {
          task.completed
            ? "Completed ✓"
            : "Pending"
        }
      </p>


      <p className="date">
        Created:
        {" "}
        {new Date(task.createdAt).toLocaleDateString()}
      </p>


      <div className="actions">

        <button
          onClick={() => onToggle(task.id)}
        >
          {
            task.completed
              ? "Undo"
              : "Complete"
          }
        </button>


        <button
          onClick={() => onEdit(task)}
        >
          Edit
        </button>


        <button
          className="delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;