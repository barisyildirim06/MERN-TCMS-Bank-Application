import React, { useEffect } from 'react'
import Axios from 'axios'

function AdminDashboardPage({ user }) {
    useEffect(() => {
        const body = {
            requiredDate : 15
        }
        Axios.post('/api/subscribers/list', body)
        Axios.post('/api/users/list', body)
        Axios.post('/api/withdrawals/list', body)
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
