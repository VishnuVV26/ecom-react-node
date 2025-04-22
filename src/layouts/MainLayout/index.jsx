import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import LoginModal from '../../components/LoginModal'
import SignupModal from '../../components/SignupModal'

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const isAdmin = location.pathname.startsWith('/admin')

    const handleCloseLogin = () => {
        setShowLoginModal(false);
        navigate('/');
    };

    const handleCloseSignup = () => {
        setShowSignupModal(false);
        navigate('/');
    };

    const handleSwitchToSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
        navigate('/register');
    };

    const handleSwitchToLogin = () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
        navigate('/login');
    };

    useEffect(() => {
        if (location.pathname === '/login') {
            setShowLoginModal(true);
            setShowSignupModal(false);
        } else if (location.pathname === '/register') {
            setShowSignupModal(true);
            setShowLoginModal(false);
        }
    }, [location.pathname]);

    return (
        <>
            {!isAdmin && (<Header />)}
            <main style={{ minHeight: '80vh', padding: '1rem' }}>
                <Outlet />
                {!isAdmin && (
                    <>
                        <LoginModal
                            isOpen={showLoginModal}
                            onClose={handleCloseLogin}
                            onSwitchToSignup={handleSwitchToSignup}
                        />
                        <SignupModal
                            isOpen={showSignupModal}
                            onClose={handleCloseSignup}
                            onSwitchToLogin={handleSwitchToLogin}
                        /></>
                )}
            </main>
            {!isAdmin && <Footer />}
        </>
    )
}

export default MainLayout