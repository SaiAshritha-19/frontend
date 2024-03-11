import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingUser, setEditingUser] = useState({ username: '', email: '' });

  useEffect(() => {
    // Load users from local storage or mock data
    const usersData = localStorage.getItem('users');
    if (usersData) {
      setUsers(JSON.parse(usersData));
    }
  }, []);

  const handleAddUser = () => {
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { ...editingUser };
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setEditingIndex(null);
      setEditingUser({ username: '', email: '' });
    } else {
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setNewUser({ username: '', email: '' });
    }
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setEditingIndex(index);
    setEditingUser({ ...userToEdit });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Users</h1>
      <div className="add-user-form">
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={editingIndex !== null ? editingUser.username : newUser.username}
          onChange={(e) => {
            if (editingIndex !== null) {
              setEditingUser({ ...editingUser, username: e.target.value });
            } else {
              setNewUser({ ...newUser, username: e.target.value });
            }
          }}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={editingIndex !== null ? editingUser.email : newUser.email}
          onChange={(e) => {
            if (editingIndex !== null) {
              setEditingUser({ ...editingUser, email: e.target.value });
            } else {
              setNewUser({ ...newUser, email: e.target.value });
            }
          }}
        />
        <button className="add-user-btn" onClick={handleAddUser}>{editingIndex !== null ? 'Update User' : 'Add User'}</button>
      </div>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-item">
            <span>{user.username}</span>
            <span>{user.email}</span>
            <div>
              <button className="edit-btn" onClick={() => handleEditUser(index)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteUser(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
