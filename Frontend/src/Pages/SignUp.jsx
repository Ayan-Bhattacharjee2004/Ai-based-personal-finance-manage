import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import whoWeAreImage from "../assets/whoWeAre.jpg"

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  }, []);

  // ...rest of the code remains the same


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:7500/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div
  className="min-h-screen min-w-screen flex items-center justify-center p-4 bg-cover bg-center"
  style={{ backgroundImage: `url(${whoWeAreImage})` }}
>
      <div className="bg-[#111] backdrop-blur-sm bg-opacity-80 rounded-2xl shadow-2xl p-8 max-w-md w-full text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-green-400 hover:opacity-90 transition"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-400 text-sm mt-5">
            Already have an account?{' '}
            <a href="/login" className="text-green-400 hover:underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
