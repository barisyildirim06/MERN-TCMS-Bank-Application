import React from 'react'
import { Table } from 'antd'

function KeyStats({ subscribers, users, withdrawals }) {
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
          title: 'USD Accounts (USD)',
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
            day: withdrawals?.pendingOneDayCount,
            week: withdrawals?.pendingSevenDaysCount,
            all: withdrawals?.pendingAllTimeCount,
        },
        {
            key: '4',
            item: 'Verified',
            day: withdrawals?.confirmedOneDayCount,
            week: withdrawals?.confirmedSevenDaysCount,
            all: withdrawals?.confirmedAllTimeCount,
        },
    ];
    return (
        <div>
            <label htmlFor="key-stats">Key Stats</label>
            <div className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} pagination={false} dataSource={data} />
            </div>
        </div>
    )
}

export default KeyStats
