import React from 'react';
import { Table } from 'antd'

function KeyFinancialStats({ generals, rates, withdrawals }) {
    const columns = [
        {
          title: 'Item',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'NZD Accounts (NZD)',
          dataIndex: 'nzd',
          key: 'nzd',
        },
        {
          title: 'USD Accounts (USD)',
          dataIndex: 'usd',
          key: 'usd',
        },
        {
          title: 'AUD Accounts (AUD)',
          dataIndex: 'aud',
          key: 'aud',
        },
        {
          title: 'Sum of All Acounts ($)',
          dataIndex: 'sum',
          key: 'sum',
        },
    ]

    const data = [
        {
            key: '1',
            item: 'Total Fudning Under Management',
            nzd: generals?.totalNzdAmount?.toFixed(2),
            usd: generals?.totalUsdAmount?.toFixed(2),
            aud: generals?.totalAudAmount?.toFixed(2),
            sum: (generals?.totalUsdAmount + (generals?.totalAudAmount / rates?.AUD) + (generals?.totalNzdAmount / rates?.NZD))?.toFixed(2),
        },
        {
            key: '2',
            item: 'Total Pending Withdrawals',
            nzd: withdrawals?.totalNzdAmount?.toFixed(2),
            usd: withdrawals?.totalUsdAmount?.toFixed(2),
            aud: withdrawals?.totalAudAmount?.toFixed(2),
            sum: (withdrawals?.totalUsdAmount + (withdrawals?.totalAudAmount / rates?.AUD) + (withdrawals?.totalNzdAmount / rates?.NZD))?.toFixed(2),
        },
    ];
    return (
        <div >
            <label htmlFor="KeyFinancialStats">Key Financial Stats</label>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} pagination={false} dataSource={data} />
            </div>
        </div>
    )
}

export default KeyFinancialStats
