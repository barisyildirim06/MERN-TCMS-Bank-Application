import React from 'react';
import { Table } from 'antd'
import { Utils } from 'utils';

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
            nzd: Utils.formatter.format(generals?.totalNzdAmount?.toFixed(2)),
            usd: Utils.formatter.format(generals?.totalUsdAmount?.toFixed(2)),
            aud: Utils.formatter.format(generals?.totalAudAmount?.toFixed(2)),
            sum: Utils.formatter.format((generals?.totalUsdAmount + (generals?.totalAudAmount / rates?.AUD) + (generals?.totalNzdAmount / rates?.NZD))?.toFixed(2)),
        },
        {
            key: '2',
            item: 'Total Pending Withdrawals',
            nzd: Utils.formatter.format(withdrawals?.totalNzdAmount?.toFixed(2)),
            usd: Utils.formatter.format(withdrawals?.totalUsdAmount?.toFixed(2)),
            aud: Utils.formatter.format(withdrawals?.totalAudAmount?.toFixed(2)),
            sum: Utils.formatter.format((withdrawals?.totalUsdAmount + (withdrawals?.totalAudAmount / rates?.AUD) + (withdrawals?.totalNzdAmount / rates?.NZD))?.toFixed(2)),
        },
    ];
    return (
        <div >
            <div style={{ display: 'flex', margin: '0 10vw' }}>
                <h3>Key Financial Stats Management</h3>
            </div>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} pagination={false} dataSource={data} />
            </div>
        </div>
    )
}

export default KeyFinancialStats
