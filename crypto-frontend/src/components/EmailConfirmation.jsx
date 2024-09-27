import React from 'react';

const EmailConfirmation = () => {
  return (
    <div className="w-screen h-screen bg-darker flex flex-col justify-center text-light text-xl josefin-sans">
      <div className='bg-dark shadow-2xl border-purple shadow-purple w-[350px] h-auto mx-auto px-12 py-16 rounded-xl text-center'>
        <h2 className="text-[32px] font-bold mb-6">Confirm Your Email</h2>
        <p className="mb-6 text-md">
          A confirmation email has been sent to your email address. 
          Please check your inbox and click on the confirmation link to verify your email address.
        </p>
        <p className="text-sm text-gray-400">
          If you don't see the email in your inbox, please check your spam or junk folder.
        </p>
        <button className="w-full py-2 mt-6 bg-purple text-light text-[16px] rounded-md hover:bg-purple-dark">
          Resend Confirmation Email
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmation;
