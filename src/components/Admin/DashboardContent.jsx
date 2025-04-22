import React from 'react'
import DashboardPage from './DashboardPage'
import AllProducts from './AllProducts'
import Orders from './Orders'
import DashboardHeader from './DashboardHeader'

const DashboardContent = ({ activeTab }) => {
    return (
        <div className='w-full'>
            <DashboardHeader />
            <div className='mt-1 bg-gray-200'>
                {activeTab === 'dashboard' && (<DashboardPage />)}
                {activeTab === 'products' && (<AllProducts />)}
                {activeTab === 'orders' && (<Orders />)}
            </div>
        </div>
    )
}

export default DashboardContent