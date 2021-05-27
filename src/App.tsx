import React from 'react';
import './App.css';
import ItemList from './pages/ItemList';
import TopBar from './components/topBar';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TopBar />
        <ItemList />
      </Provider>
    </div>
  );
}

export default App;
