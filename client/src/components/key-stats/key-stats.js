import React from 'react'
import { Table } from 'antd'

function KeyStats({ subscribers, users }) {
    const columns = [
        {
          title: 'Item',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'Last 24 Hours',
          dataIndex: 'day',
          key: 'day',
        },
        {
          title: 'Last Week',
          dataIndex: 'week',
          key: 'week',
        },
        {
          title: 'Total All Time',
          dataIndex: 'all',
          key: 'all',
        },
    ]

    const data = [
        {
            key: '1',
            item: 'New Lead Emails',
            day: subscribers?.oneDayCount,
            week: subscribers?.sevenDaysCount,
            all: subscribers?.allTimeCount,
        },
        {
            key: '2',
            item: 'Total Accounts',
            day: users?.oneDayCount,
            week: users?.sevenDaysCount,
            all: users?.allTimeCount,
        },
        {
            key: '3',
            item: 'Pending Verification',
            day: users?.oneDayCountUnapproved,
            week: users?.sevenDaysCountUnApproved,
            all: users?.allTimeCountUnapproved,
        },
        {
            key: '4',
            item: 'Verified',
            day: users?.oneDayCountVerified,
            week: users?.sevenDaysCountVerified,
            all: users?.allTimeCountVerified,
        },
    ];
    return (
        <div>
            <div style={{ display: 'flex', margin: '0 10vw' }}>
                <h3>Key Stats Management</h3>
            </div>
            <div className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} pagination={false} dataSource={data} />
            </div>
        </div>
    )
}

export default KeyStats
