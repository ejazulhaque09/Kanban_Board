import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, addTask, deleteTask } from './store';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const stages = ["Todo", "In Progress", "Peer Review", "Done"];
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  const handleDrop = (e, stage) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    dispatch(moveTask({ from: task.stage, to: stage, task }));
  };

  const handleDragStart = (e, task, stage) => {
    e.dataTransfer.setData('task', JSON.stringify({ ...task, stage }));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      dispatch(
        addTask({ 
          id: Date.now(), 
          title: newTaskTitle, 
          description: newTaskDescription 
        })
      );
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  const handleDeleteTask = (stage, id) => {
    dispatch(deleteTask({ stage, id }));
  };

  const filteredTasks = (stage) => {
    return tasks[stage].filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="kanban-board">
      <div className="header">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
          />
        </div>
        <div className="add-task-container">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task Description"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      <div className="cards">

      {stages.map((stage) => (
        <div
          key={stage}
          className="kanban-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, stage)}
        >
          <h3>{stage}</h3>
          {filteredTasks(stage).map((task) => (
            <div
              key={task.id}
              className="kanban-task"
              draggable
              onDragStart={(e)   => handleDragStart(e, task, stage)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteTask(stage, task.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
