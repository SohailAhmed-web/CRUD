const matchesSearch = (user, term) =>
  [user.name, user.email, user.role].some(field =>
    field.toLowerCase().includes(term.toLowerCase())
  );

const matchesFilter = (status, filter) => filter === 'all' || status === filter;

export const filterUsers = (users, searchTerm, selectedFilter) =>
  users.filter(u => matchesSearch(u, searchTerm) && matchesFilter(u.status, selectedFilter));
