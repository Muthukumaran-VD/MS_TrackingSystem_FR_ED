// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleUserView from './pages/singleUserView/SingleUserView'; 
import Sidebar from './components/sidebar/Sidebar';
import UserList from './pages/userList/UserList'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='main'>
          <Routes>
            <Route path="/" element={<UserList />} /> 
            <Route path="/user/:userId" element={<SingleUserView />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
