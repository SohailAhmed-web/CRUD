import { useState } from 'react';
import { initialUsers } from '../data/initialUsers';

export const useUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
  };

  const updateUser = (user) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return { users, addUser, updateUser, deleteUser, editingUser, setEditingUser };
};
