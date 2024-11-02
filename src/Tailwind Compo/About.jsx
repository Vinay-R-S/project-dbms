import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">About Project Manager</h1>
      <div className="max-w-3xl text-center text-gray-200">
        <p className="mb-4">
          Project Manager is a simple and efficient tool designed to help teams manage their projects effortlessly.
          From task assignments to progress tracking, our goal is to streamline your workflow and increase productivity.
        </p>
        <p className="mb-4">
          Built using modern web technologies, our platform is optimized for performance and usability, ensuring a
          smooth experience for both managers and team members.
        </p>
        <p>
          We believe in empowering teams to focus on what they do best. Start your journey with us today and transform
          the way you manage your projects!
        </p>
      </div>
    </div>
  );
};

export default About;
