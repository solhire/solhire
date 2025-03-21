'use client';

import { useState } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const DevelopmentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] min-h-[48px]">
      <div className="py-2 px-3 sm:py-3 sm:px-6 bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600 text-white shadow-lg">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <FiAlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-300" aria-hidden="true" />
            <div>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                <span className="mr-1 font-bold">Demo Version:</span>
                This is a demo with placeholder services and reviews. Account creation, transactions, and service creation are not fully operational.
              </p>
              <p className="text-xs sm:text-sm md:text-base font-medium mt-1">
                <span className="mr-1 font-bold">Notice:</span>
                Official contract address will be posted first @solhire on X.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex rounded-md p-1.5 hover:bg-purple-700/50 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentBanner; 