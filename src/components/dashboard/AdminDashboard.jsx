import { useState } from 'react';
import { motion } from 'framer-motion';
import { initialUsers } from '../../data/initialUsers';
import { filterUsers } from '../../utils/filters';
import { pageContainer, fadeInUp } from '../../animations/containerVariants';
import { useCRUD } from '../../hooks/useCRUD';
import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import SearchFilterBar from './SearchFilterBar';
import UserTable from './UserTable';
import SuccessToast from './SuccessToast';
import AddEditUserModal from './AddEditUserModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const {
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
  } = useCRUD(initialUsers);

  const filteredUsers = filterUsers(users, searchTerm, selectedFilter);
  const deletingUser = users.find(u => u.id === deletingUserId);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-8"
      variants={pageContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {showSuccess && <SuccessToast message={successMessage} />}
        
        <motion.div variants={fadeInUp}>
          <DashboardHeader onAdd={handleAddClick} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <StatsCards users={users} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <SearchFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <UserTable 
            users={filteredUsers} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteClick} 
          />
        </motion.div>

        <AddEditUserModal
          isOpen={showAddModal}
          user={editingUser}
          onSave={handleSaveUser}
          onClose={handleCloseAddModal}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          userName={deletingUser?.name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        />
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
