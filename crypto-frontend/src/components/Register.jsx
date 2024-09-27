import React, { useState, useEffect } from 'react';

const Register = () => {
  // State to handle form inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission for email/password registration
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    // Reset the error
    setError('');

    // Submit form data (email, password) to your backend for registration
    console.log({ email, password });
    // You would call your API here to handle registration
  };

  // Initialize Google API for registration
  const loadGoogleScript = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        });

        auth2.attachClickHandler(
          document.getElementById('googleRegisterBtn'),
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();
            console.log('Google Sign-Up Successful!');
            console.log('Name:', profile.getName());
            console.log('Email:', profile.getEmail());
            // You can send the token/profile information to your backend for processing here
          },
          (error) => {
            console.log('Google Sign-Up error:', error);
          }
        );
      });
    };
  };

  // Load the Google script when the component mounts
  useEffect(() => {
    loadGoogleScript();
  }, []);

  return (
    <div className="w-screen h-screen bg-darker flex flex-col justify-center text-light text-xl josefin-sans">
      <div className='bg-dark shadow-2xl border-purple shadow-purple w-[350px] h-[600px] mx-auto px-6 py-8 rounded-xl'>
        <h2 className="text-center text-[32px] mb-12 font-bold">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
          <div className="form-group mb-2">
            <label htmlFor="email" className="block text-md">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-purple rounded-md bg-transparent text-light"
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="block text-md">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-purple rounded-md bg-transparent text-light"
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="repeatPassword" className="block text-md">Repeat Password:</label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-purple rounded-md bg-transparent text-light"
            />
          </div>

          {error && <p className="text-new-red mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-purple text-light rounded-md hover:bg-purple-dark"
          >
            Register
          </button>
        </form>

        {/* Google Sign-up Button */}
        <div className="text-center mt-4">
          <p className="text-sm mb-1">Or sign up with:</p>
          <button
            id="googleRegisterBtn"
            className="w-full py-2 bg-new-red-500 text-light rounded-md hover:bg-purple transition-all duration-[300ms]"
          >
            Sign up with <span className='text-blue-500'>G</span><span className='text-red-500'>o</span><span className='text-yellow-500'>o</span><span className='text-blue-500'>g</span><span className='text-green-500'>l</span><span className='text-red-500'>e</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
