import React, { useEffect } from 'react'
import Axios from 'axios'

function AdminDashboardPage({ user }) {
    useEffect(() => {
        Axios.get('/api/subscribers/list')
        Axios.get('/api/users/list')
        Axios.get('/api/withdrawals/list')
    }, [])
    return (
        <div>
            {!user?.userData?.isAdmin ? null:
                <div>
                    AdminDashboard
                </div>
            }
        </div>
    )
}

export default AdminDashboardPage
