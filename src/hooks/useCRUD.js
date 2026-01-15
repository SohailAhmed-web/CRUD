import { useState, useCallback } from 'react';

const ROLES = ['Developer', 'Designer', 'Manager', 'Product Manager', 'QA Engineer'];

export const useCRUD = (initialUsers) => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const generateId = useCallback(() => Math.max(...users.map(u => u.id), 0) + 1, [users]);

  const showToast = useCallback((message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingUser(null);
    setShowAddModal(true);
  }, []);

  const handleEditClick = useCallback((user) => {
    setEditingUser(user);
    setShowAddModal(true);
  }, []);

  const handleDeleteClick = useCallback((userId) => {
    setDeletingUserId(userId);
    setShowDeleteModal(true);
  }, []);

  const handleSaveUser = useCallback((formData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      showToast('User updated successfully!');
    } else {
      const newUser = {
        id: generateId(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
      showToast('User added successfully!');
    }
    setShowAddModal(false);
    setEditingUser(null);
  }, [users, editingUser, generateId, showToast]);

  const handleConfirmDelete = useCallback(() => {
    setUsers(users.filter(u => u.id !== deletingUserId));
    showToast('User deleted successfully!');
    setShowDeleteModal(false);
    setDeletingUserId(null);
  }, [users, deletingUserId, showToast]);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    setEditingUser(null);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setDeletingUserId(null);
  }, []);

  return {
    users,
    editingUser,
    deletingUserId,
    showAddModal,
    showDeleteModal,
    showSuccess,
    successMessage,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleSaveUser,
    handleConfirmDelete,
    handleCloseAddModal,
    handleCloseDeleteModal,
  };
};

export { ROLES };
