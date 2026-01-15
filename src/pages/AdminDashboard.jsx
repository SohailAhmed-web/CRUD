import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import { useUsers } from '../hooks/useUsers';

export default function AdminDashboard() {
  const { users, addUser, updateUser, deleteUser, editingUser, setEditingUser } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const emptyForm = { name: '', email: '', role: '', joinDate: '' };
  const [formData, setFormData] = useState(emptyForm);

  const filtered = users.filter(u =>
    Object.values(u).some(v => v.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = () => {
    editingUser ? updateUser({ ...formData, id: editingUser.id }) : addUser(formData);
    setFormData(emptyForm);
    setEditingUser(null);
    setShowModal(false);
  };

  const handleAddClick = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(emptyForm);
  };

  return (
    <>
      <Header total={users.length} />
      <main className="max-w-7xl mx-auto p-6">
        <SearchBar value={search} onChange={setSearch} onAdd={handleAddClick} />
        <UserTable users={filtered} onEdit={(u) => { setEditingUser(u); setFormData(u); setShowModal(true); }} onDelete={deleteUser} />
      </main>

      <UserModal
        open={showModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit={!!editingUser}
      />
    </>
  );
}
