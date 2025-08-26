'use client'
import Link from 'next/link';
import React, { useState,useEffect } from 'react'

function Navbar() {
  const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("isAuth");
    setIsAuth(auth);
  }, []);
  const navlist = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "Contact", path: "/" }
  ];
  return (
    <div className='flex justify-between items-center p-4'>
      <h1>Directus App</h1>
      <nav className='flex justify-center'>
        <ul className='flex space-x-4'>
          {!isAuth && navlist.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
          {isAuth && (
            <ul className='flex space-x-4'>
               <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
              <li>
              <Link href="/customer">Customer</Link>
            </li>
            <li>
              <Link href="/task">Task</Link>
            </li>
            </ul>
          )}
        </ul>
      </nav>
      <div className='flex space-x-4'>
       {!isAuth && (
         <>
           <Link href="/login" className='bg-black rounded-2xl text-white py-2 px-4'>Login</Link>
           <Link href="/register" className='bg-black rounded-2xl text-white py-2 px-4'>Register</Link>
         </>
       )}
       {isAuth && (
         <Link href="/" className='bg-black rounded-2xl text-white py-2 px-4' onClick={() => {
           sessionStorage.removeItem("isAuth");
           window.location.href = "/";
         }}>Logout</Link>
       )}
      </div>
    </div>
  )
}

export default Navbar
