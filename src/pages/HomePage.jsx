import React from 'react';
// No longer need './Pages.css'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center bg-gradient-to-r from-accent-light to-accent-lighter rounded-lg shadow-xl mt-8">
      <h1 className="text-5xl font-extrabold text-soft-blue-medium mb-6 animate-fade-in-down">Welcome to ScholarMatch!</h1>
      <p className="text-xl text-text-primary max-w-3xl mx-auto mb-8 animate-fade-in-up">
        Your ultimate platform to discover the latest scholarship programs tailored for students and learners in Indonesia.
      </p>
      <p className="text-lg italic text-text-secondary mb-12 animate-fade-in-up delay-200">
        Explore a world of opportunities and find the perfect scholarship to fuel your academic journey.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[280px] max-w-[350px] text-left hover:shadow-lg transform hover:-translate-y-1 transition duration-300 animate-fade-in-left">
          <h3 className="text-2xl font-semibold text-soft-blue-medium mb-3">Easy Registration & Login</h3>
          <p className="text-text-secondary">Create an account or log in to access personalized features securely.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[280px] max-w-[350px] text-left hover:shadow-lg transform hover:-translate-y-1 transition duration-300 animate-fade-in-up delay-300">
          <h3 className="text-2xl font-semibold text-soft-blue-medium mb-3">Browse Scholarships</h3>
          <p className="text-text-secondary">View a comprehensive list of available scholarships with detailed information.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[280px] max-w-[350px] text-left hover:shadow-lg transform hover:-translate-y-1 transition duration-300 animate-fade-in-right">
          <h3 className="text-2xl font-semibold text-soft-blue-medium mb-3">Admin Control</h3>
          <p className="text-text-secondary">Admins can effortlessly add, update, and delete scholarship listings.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;