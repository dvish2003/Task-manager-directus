'use client'
import axios from 'axios';
import React, { useState } from 'react';

function LoginPage() {
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post('/api/login', formdata);
    if (response.status === 200) {
        const token = response.data.token;  
        const user = response.data.user;
      alert('Login successful');
      setFormdata({ email: '', password: '' });
      localStorage.setItem('token',token);
      sessionStorage.setItem('isAuth', 'true');
      localStorage.setItem('email', formdata.email);
      localStorage.setItem('customer_id', user.id);
      window.location.href = '/dashboard';

    } else if (response.status === 404) {
      alert('User does not exist');
    } else {
      alert('Login failed');
    }
  } catch (error) {
    alert('Error logging in');
  }
};


  return (
    <div>
      <h1 className="text-5xl font-bold text-center">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
