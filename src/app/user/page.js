export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the GET endpoint
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

  // Handle form submission to create a new user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => [...prev, data.createdUser]);
        setName('');
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  }
}
