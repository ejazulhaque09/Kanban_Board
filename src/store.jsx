import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('tasks')) || {
  Todo: [],
  "In Progress": [],
  "Peer Review": [],
  Done: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.Todo.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    moveTask: (state, action) => {
      const { from, to, task } = action.payload;
      state[from] = state[from].filter((t) => t.id !== task.id);
      state[to].push(task);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const { stage, id } = action.payload;
      state[stage] = state[stage].filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
  },
});

export const { addTask, moveTask, deleteTask } = tasksSlice.actions;

// exporting the store
const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export default store; // Default export
