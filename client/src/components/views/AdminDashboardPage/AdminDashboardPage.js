import React from 'react'

function AdminDashboardPage({ user }) {
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
