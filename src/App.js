import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasePage from './Components/BasePage';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <BasePage />
    </React.Fragment>
  );
}

export default App;
