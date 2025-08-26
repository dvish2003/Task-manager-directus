'use client'
import axios from 'axios';
import React, { useState } from 'react'

function Page() {
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirm_password: ''
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormdata({
        ...formdata,
        [name]: value
        });
    };

const handleValidate = () => {
    if (formdata.password !== formdata.confirm_password) {
        alert('Passwords do not match');
        return false;
    }
    return true;
};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleValidate()) return;

    try {
      const response = await axios.post('/api/register', {
        email: formdata.email,
        password: formdata.password,
        name: formdata.first_name + ' ' + formdata.last_name  
      });
      

      if (response.status === 200) {
        alert('Registration successful');
        setFormdata({
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          confirm_password: ''
        });
      } 
      if(response.status === 409) {
        alert('User already exists');
      }
    } catch (error) {
        alert('Error registering user');
       }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="name" name="first_name" value={formdata.first_name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="last-name" name="last_name" value={formdata.last_name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formdata.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={formdata.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm_password" value={formdata.confirm_password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Register</button>
      </form>
    </div>
  )
}

export default Page
