import React, { useState } from 'react'
import { Table, Select } from 'antd'

const { Option } = Select;
function WithdrawalManagement({ withdrawals }) {
    console.log(withdrawals)
    const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
    const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);

    const [filterType, setFilterType] = useState('week');

    const handleChange = (value) => {
        if (value === 'day') setFilterType('day')
        if (value === 'week') setFilterType('week')
    }

    const filteredDropdown = (<>
      <Select defaultValue={'week'} style={{ width: '200px' }} onChange={handleChange}>
          <Option key='day'>Last 24 Hours</Option>
          <Option key='week'>Last Week</Option>
      </Select>
    </>)

    const columns = [
        {
            title: '#',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Account ID',
            dataIndex: 'userID',
            key: 'userID',
        },
        {
            title: 'Organization Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date of Submission',
            dataIndex: 'createdAt',
            key: 'createdAt',
            filterMultiple: false,
            filterMode: 'tree',
            filterDropdown: filteredDropdown,
            filters: [
                {
                  text: 'Last Day',
                  value: 'day',
                },
                {
                  text: 'Last Week',
                  value: 'week',
                },
            ],
        }
    ]

    const data = withdrawals.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).map((s,i) => ({
        key: i+1,
        number: i+1,
        userID: s.user.userID,
        companyName: s.user.companyName,
        amount: s.amount,
        createdAt: s.createdAt,
    }))
    return (
        <div >
            <label>Pending Withdrawal Management</label>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default WithdrawalManagement
