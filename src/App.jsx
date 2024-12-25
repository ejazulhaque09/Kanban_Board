import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import KanbanBoard from './KanbanBoard';

function App() {
  return (
    <Provider store={store}>
      <KanbanBoard />
    </Provider>
  );
}

export default App;
