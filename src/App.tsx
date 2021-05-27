import React from 'react';
import './App.css';
import ItemList from './pages/ItemList';
import TopBar from './components/topBar';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TopBar />
        <ItemList />
        <ToastContainer autoClose={2000} position="bottom-right" />
      </Provider>
    </div>
  );
}

export default App;
