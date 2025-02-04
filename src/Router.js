// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
// import Dashboard from './pages/dashboard/Dashboard';
import UserList from './pages/employeeListing/UserList';
import BGVRequestForm from './pages/bgvRequestManagerForm/BGVRequestForm';
import SingleUserView from './pages/singleUserView/SingleUserView';
import BGVRequestEmployeeForm from './pages/bgvEmployeeForm/BGVEmployeeForm';
// import SignUp from './pages/signup/Signup';
// import Login from './pages/login/Login';
import UserListing from './pages/employeeList/UserListing';
import AddingMail from './pages/masterdata/maildCrud/AddingMailId';
import Vdlogo from '../src/assets/images/VD.png';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to handle sidebar collapse state
  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar with collapse handler */}
        <Sidebar onCollapse={handleSidebarToggle} />

        {/* Main Content Area */}
        <div className={`main ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          {/* Header */}
          <div className="header-container">
            <h2>Microsoft Account Tracking System</h2>
            <img src={Vdlogo} alt="VueData Logo" className="Vuedatalogo" />
          </div>

          {/* Routes */}
          <Routes>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} /> */}
            <Route path="/employees" element={<UserList />} />
            <Route path="/bgv-request" element={<BGVRequestForm />} />
            <Route path="/user/:userId" element={<SingleUserView />} />
            <Route path="/bgv-employeeform/:id" element={<BGVRequestEmployeeForm />} />
            <Route path="/adding-mail" element={<AddingMail />} />
            <Route path="/user-listing" element={<UserListing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
