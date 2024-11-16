// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleUserView from './pages/singleUserView/SingleUserView';
import Sidebar from './components/sidebar/Sidebar';
import UserList from './pages/employeeListing/UserList';
import BGVRequestForm from './pages/bgvRequestManagerForm/BGVRequestForm';
import Dashboard from './pages/dashboard/Dashboard';
import BGVRequestEmployeeForm from './pages/bgvEmployeeForm/BGVEmployeeForm';
import SignUp from './pages/signup/Signup';
import Login from './pages/login/Login';
import EmployeeRequestStatus from './pages/masterdata/employeeStatusupdating/EmployeeStatusUpdating';
import UserListing from './pages/employeeList/UserListing';
import AddingMail from './pages/masterdata/maildCrud/AddingMailId';

function App() {
  return (
    <Router>
      <div className="app-container">
        {<Sidebar />} {/* Show Sidebar only if logged in */}
        <div className='main'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Protected Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<UserList />} />
            <Route path="/bgv-request" element={<BGVRequestForm />} />
            <Route path="/user/:userId" element={<SingleUserView />} />
            <Route path="/bgv-employeeform" element={<BGVRequestEmployeeForm />} />
            <Route path="/adding-mail" element={<AddingMail />} />
            <Route path="/user-listing" element={<UserListing />} />
            <Route path="/employee-request-status" element={<EmployeeRequestStatus />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
