import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";


function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit
}) {

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);


  const slides =
    tasks.length > 0
      ? [
          tasks[tasks.length - 1],
          ...tasks,
          tasks[0]
        ]
      : [];


  useEffect(() => {

    if (tasks.length === 0) {
      return;
    }


    const timer = setInterval(() => {

      setCurrentIndex((prev) => prev + 1);

    }, 3000);


    return () => clearInterval(timer);

  }, [tasks.length]);


  function handleTransitionEnd() {

    if (currentIndex === slides.length - 1) {

      setTransition(false);
      setCurrentIndex(1);

    }


    if (currentIndex === 0) {

      setTransition(false);
      setCurrentIndex(tasks.length);

    }

  }

  
  useEffect(() => {

    if (!transition) {

      const timeout = setTimeout(() => {

        setTransition(true);

      }, 50);


      return () => clearTimeout(timeout);
    }

  }, [transition]);


  if (tasks.length === 0) {

    return (
      <div className="empty">
        No tasks available
      </div>
    );

  }


  return (

    <div className="carousel">

      <div

        className="carousel-track"

        style={{
          transform:
            `translateX(-${currentIndex * 100}%)`,

          transition:
            transition
              ? "transform 0.5s ease"
              : "none"
        }}

        onTransitionEnd={handleTransitionEnd}

      >

        {
          slides.map((task, index) => (

            <div
              className="carousel-slide"
              key={`${task.id}-${index}`}
            >

              <TaskItem
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />

            </div>

          ))
        }

      </div>

    </div>

  );
}



export default TaskList;