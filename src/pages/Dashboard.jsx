import React, { useState } from 'react'
import Sidebar from '../components/Admin/Sidebar'
import DashboardContent from '../components/Admin/DashboardContent'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    return (
        <div className='flex'>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <DashboardContent activeTab={activeTab} />
        </div>
    )
}

export default Dashboard