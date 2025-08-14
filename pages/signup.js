import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(
        'https://ticketsystem-3.onrender.com/api/users/register', 
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setMessage('✅ User registered successfully!');
        router.push('/');
        setFormData({ name: '', email: '', password: '', role: 'USER' });
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
       <h1>Welcome to Ticket Raiser You can ask for solution of any problem you observe </h1>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.signupText}>
          Already have an account?{' '}
          <span style={styles.signupLink} onClick={() => router.push('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
    padding: '20px'
  },
  card: {
    background: '#fff',
    padding: '30px',
    margin:'50px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn 0.5s ease-in-out'
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
    fontWeight: 'bold'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '5px',
    transition: 'background 0.3s ease'
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#444'
  },
  signupText: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555'
  },
  signupLink: {
    color: '#0070f3',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};
