import './styles/output.css';
import React from 'react';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const App: React.FC = () => {
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Dashboard />
    </div>
  );
};

export default App;
