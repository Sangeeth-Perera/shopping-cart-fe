import React from 'react';
import './App.css';
import ItemList from './pages/ItemList';
import TopBar from './components/topBar';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';




function App() {
  return (
    <Router>
    <div className="App">
      <Provider store={store}>
        <TopBar />
          <AppRoutes/>
        <ToastContainer autoClose={2000} position="bottom-right" />
      </Provider>
    </div>
    </Router>
  );
}

export default App;
