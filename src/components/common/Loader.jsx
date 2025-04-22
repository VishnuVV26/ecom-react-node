import React from 'react';

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-60 z-[60] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>

    );
};

export default FullPageLoader;
