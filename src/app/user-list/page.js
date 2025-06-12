'use client';

import { useState, useEffect } from 'react';

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        if (res.ok) setUsers(data.users);
        else throw new Error(data.error);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} className="border-b py-2">{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

