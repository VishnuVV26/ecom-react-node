import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ showMobileMenu, toggleMobileMenu }) => {
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                toggleMobileMenu();
            }
        };

        if (showMobileMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent scrolling when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [showMobileMenu, toggleMobileMenu]);

    if (!showMobileMenu) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />

            {/* Menu */}
            <div ref={menuRef} className="md:hidden bg-black opacity-90 p-6 h-svh shadow-md absolute top-0 right-0 w-2/3 overflow-y-hidden">
                <div className='text-right'>
                    <button className='text-primary-5' onClick={toggleMobileMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>
                <div className='mt-2'>
                    <h2 className='text-primary-5 text-2xl font-bold'>ShoppyPlan</h2>
                </div>
                <nav className="flex flex-col space-y-4 pt-8">
                    <Link
                        to="/"
                        className="text-primary-5 hover:text-primary transition"
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/shop"
                        className="text-primary-5 hover:text-primary transition"
                        onClick={toggleMobileMenu}
                    >
                        Shop
                    </Link>
                    <Link
                        to="/about"
                        className="text-primary-5 hover:text-primary transition"
                        onClick={toggleMobileMenu}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        className="text-primary-5 hover:text-primary transition"
                        onClick={toggleMobileMenu}
                    >
                        Contact
                    </Link>
                    <div className="flex space-x-6 pt-4">
                        <Link
                            to="/account"
                            className="text-primary-5 hover:text-primary transition"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                    fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                            </svg>
                        </Link>

                        <Link
                            to="/wishlist"
                            className="text-primary-5 hover:text-primary transition"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                            </svg>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;