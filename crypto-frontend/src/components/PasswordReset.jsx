import React, { useState } from 'react';

const PasswordReset = () => {
  // State to handle form input and messages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission for password reset
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    // Reset error and message
    setError('');
    setMessage('If this email is registered, a password reset link has been sent.');

    // Send the email to the backend for password reset link generation
    console.log('Password reset email sent to:', email);
    // You would call your API here to send the reset email
  };

  return (
    <div className="w-screen h-screen bg-darker flex flex-col justify-center text-light text-xl josefin-sans">
      <div className='bg-dark shadow-2xl border-purple shadow-purple w-[350px] h-auto mx-auto px-6 py-8 rounded-xl text-center'>
        <h2 className="text-[32px] font-bold mb-6">Reset Password</h2>
        <p className="text-[18px] mb-4">Enter your email address to receive a password reset link.</p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
          <div className="form-group mb-0">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-purple rounded-md bg-transparent text-light"
            />
          </div>

          {error && <p className="text-new-red mb-2">{error}</p>}
          {message && <p className="text-green-500 mb-2">{message}</p>}

          <button
            type="submit"
            className="w-full py-2 mb-2 bg-purple text-light rounded-md hover:bg-purple"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-gray-400">
          If you don't receive the email, check your spam folder or try again.
        </p>

        <p className="mt-6">
          <a href="/login" className="text-light hover:underline decoration-purple">Go back to <span className='text-purple'>Login</span></a>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
