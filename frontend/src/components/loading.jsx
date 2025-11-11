import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-8 border-white border-opacity-30 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
        <p className="text-white text-opacity-80">Please wait</p>
      </div>
    </div>
  );
};

export default Loading;