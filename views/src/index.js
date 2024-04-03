import React from 'react';
import { createRoot } from 'react-dom/client'; // corrected import
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/main/Dashboard';
// import PO from './components/PO/ViewPO';
// import Home from './components/main/Home';
import PoDashboard from './components/main/PoDashboard';
import Accounts from './components/user/Accounts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "/po",
        element: <PoDashboard />
      },
      {
        path: "/account",
        element: <Accounts />
      },
    ]
  }
])

const root = createRoot(document.getElementById('root')); // Using createRoot
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
