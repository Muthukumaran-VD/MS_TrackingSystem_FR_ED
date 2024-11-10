// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import SingleUserView from './pages/singleUserView/SingleUserView'; 
import Sidebar from './components/sidebar/Sidebar';
import UserList from './pages/userList/UserList'; 
import BGVRequestForm from './pages/bgvRequestForm/BGVRequestForm';
import Dashboard from './pages/dashboard/Dashboard';
import BGVRequestEmployeeForm from './pages/bgvEmployeeForm/BGVEmployeeForm';
import SignUp from './pages/signup/Signup';
import Login from './pages/login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  // Function to handle successful login (update state)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // ProtectedRoute component to restrict access
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar />} {/* Show Sidebar only if logged in */}
        <div className='main'>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
            <Route path="/bgv-request" element={<ProtectedRoute><BGVRequestForm /></ProtectedRoute>} />
            <Route path="/user/:userId" element={<ProtectedRoute><SingleUserView /></ProtectedRoute>} />
            <Route path="/bgv-employeeform" element={<ProtectedRoute><BGVRequestEmployeeForm /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
