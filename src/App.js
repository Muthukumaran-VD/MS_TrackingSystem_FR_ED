// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleUserView from './pages/singleUserView/SingleUserView'; 
import Sidebar from './components/sidebar/Sidebar';
import UserList from './pages/userList/UserList'; 
import BGVRequestForm from './pages/bgvRequestForm/BGVRequestForm';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
  return (
    <Router>
      <div className="app-container">
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='main'>
          <Routes>
           <Route path="/" element={<Dashboard />} /> 
            <Route path="/employees" element={<UserList />} /> 
            <Route path="/bgv-request" element={<BGVRequestForm />} /> 
            <Route path="/user/:userId" element={<SingleUserView />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
