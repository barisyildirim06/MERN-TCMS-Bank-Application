import React from 'react'
import { Table } from 'antd'

function LeadManagement({ subscribers }) {
    const columns = [
        {
            title: '#',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date of Submission',
            dataIndex: 'createdAt',
            key: 'createdAt',
        }
    ]
    const data = subscribers.subscribers.map((s,i) => ({
        key: i+1,
        number: i+1,
        email: s.email,
        createdAt: s.createdAt
    }))
    return (
        <div >
            <label>Lead Management</label>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default LeadManagement
