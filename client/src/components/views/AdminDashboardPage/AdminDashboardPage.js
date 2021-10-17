import React, { useEffect } from 'react'
import Axios from 'axios'

function AdminDashboardPage({ user }) {
    useEffect(() => {
        Axios.get('/api/subscribers')
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
