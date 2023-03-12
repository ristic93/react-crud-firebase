import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { EmployeesProvider } from './context/EmployeesContext';
import { TasksProvider } from './context/TasksContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <TasksProvider>
        <EmployeesProvider>
          <App />
        </EmployeesProvider>
      </TasksProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
