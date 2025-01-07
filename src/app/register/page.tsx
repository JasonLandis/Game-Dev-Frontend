'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data)

      if (response.ok) {
        setMessage(data.message);
        setFormData({ username: '', password: '', email: '' });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.' + error);
    }
  };

  return (
    <main>
      <div className="w-full max-w-md mx-auto p-8 shadow-xl rounded-lg mt-10 border-2 border-black">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="flex justify-center block font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-8">
            <label className="flex justify-center block font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-8">
            <label className="flex justify-center block font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirm password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-8">
            <label className="flex justify-center block font-bold mb-2">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <button
              type="submit"
              className="w-full bg-slate-200 p-2 rounded-lg font-semibold transition-transform hover:bg-slate-300 active:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm font-semibold">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
