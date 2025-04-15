import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const Home = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const handleCloseLogin = () => {
        setShowLoginModal(false);
    };

    const handleCloseSignup = () => {
        setShowSignupModal(false);
    };

    const handleSwitchToSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
    };

    const handleSwitchToLogin = () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
    };

    return (
        <div>
            <LoginModal
                isOpen={showLoginModal}
                onClose={handleCloseLogin}
                onSwitchToSignup={handleSwitchToSignup}
            />
            <SignupModal
                isOpen={showSignupModal}
                onClose={handleCloseSignup}
                onSwitchToLogin={handleSwitchToLogin}
            />
        </div>
    );
};

export default Home;