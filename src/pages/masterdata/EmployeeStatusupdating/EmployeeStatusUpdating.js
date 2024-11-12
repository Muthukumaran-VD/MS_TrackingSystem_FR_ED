import React, { useState, useEffect } from 'react';
import './EmployeeStatusUpdating.css'; // Importing the CSS file for styling
import axios from 'axios';

const EmployeeRequestStatus = () => {
  const [status, setStatus] = useState('');
  const [role, setRole] = useState(''); // New state for role
  const [statuses, setStatuses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all statuses from the backend when the component mounts
  useEffect(() => {
    fetchStatuses();
  }, []);

  // Fetch statuses from backend
  const fetchStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/statuses');
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  // Handle form input change for status
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle form input change for role
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the status and role inputs
    if (!status.trim() || !role.trim()) {
      alert('Please provide valid status and role.');
      return;
    }

    if (editingId) {
      // Update existing entry
      try {
        await axios.put(`http://localhost:8000/users/api/entries/${editingId}`, { name: status, role });
        alert('Status updated successfully!');
        setEditingId(null);
        setStatus('');
        setRole(''); // Clear role after update
        fetchStatuses(); // Refresh the status list
      } catch (error) {
        console.error('Error updating status:', error);
      }
    } else {
      // Create a new entry
      try {
        const response = await axios.post('http://localhost:8000/users/api/entries', { name: status, role });
        alert('Status created successfully!');
        setStatus('');
        setRole(''); // Clear role after creation
        fetchStatuses(); // Refresh the status list
      } catch (error) {
        console.error('Error creating status:', error);
      }
    }
  };

  // Handle edit button click (pre-fill form with status to edit)
  const handleEdit = (id, currentStatus, currentRole) => {
    setEditingId(id);
    setStatus(currentStatus);
    setRole(currentRole); // Set the role when editing
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/api/entries/${id}`);
      alert('Status deleted successfully!');
      fetchStatuses(); // Refresh the status list
    } catch (error) {
      console.error('Error deleting status:', error);
    }
  };

  return (
    <div className="employee-request-form-container">
      <h2>Employee Request Status</h2>

      {/* Form for adding or updating status */}
      <form onSubmit={handleSubmit} className="status-form">
        <div className="form-group">
          <label htmlFor="status">Employee Request Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            placeholder="Enter request status"
            className="status-input"
            required
          />
        </div>

        {/* New Input for Role */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            placeholder="Enter role"
            className="role-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {editingId ? 'Update Status' : 'Create Status'}
        </button>
      </form>

      {/* Table to list statuses */}
      <div className="status-list">
        <h3>Employee Statuses</h3>
        <table>
          <thead>
            <tr>
              <th>Status ID</th>
              <th>Status</th>
              <th>Role</th> {/* New column for Role */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statuses.length > 0 ? (
              statuses.map((status) => (
                <tr key={status.status_id}>
                  <td>{status.status_id}</td>
                  <td>{status.name}</td>
                  <td>{status.role}</td> {/* Display the role */}
                  <td>
                    <button
                      onClick={() => handleEdit(status.status_id, status.name, status.role)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(status.status_id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No statuses found</td> {/* Updated colspan to 4 */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeRequestStatus;
