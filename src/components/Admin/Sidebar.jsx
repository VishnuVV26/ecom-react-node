import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { label: 'Dashboard', key: 'dashboard' },
        { label: 'All Products', key: 'products' },
        { label: 'Orders', key: 'orders' }
    ]
    return (
        <div className='w-full max-w-[20%] border-r h-screen'>
            <div>
                {/* Logo */}
                <div className="flex p-4">
                    <Link to="/" className="flex items-center text-xl font-bold text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-bag-heart-fill mr-2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                        </svg>
                        ShopyPlan
                    </Link>
                </div>
                {/* NavList */}
                <div className="list p-5 flex flex-col gap-5 text-sm  font-bold  uppercase">
                    {navItems.map((item) => (
                        <button key={item.key} onClick={() => setActiveTab(item.key)} className={`w-36 h-10 rounded ${activeTab === item.key ? 'bg-primary text-white' : 'text-primary-4'}`}>
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar