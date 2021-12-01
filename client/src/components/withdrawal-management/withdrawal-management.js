import React, { useState } from 'react'
import { Table, Select } from 'antd'
import Axios from 'axios';
import { DownloadOutlined } from '@ant-design/icons';
import { Utils } from 'utils';

const { Option } = Select;
function WithdrawalManagement({ withdrawals, onWithdrawalConfirm }) {
    const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
    const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);

    const [filterType, setFilterType] = useState('week');

    const handleChange = (value) => {
        if (value === 'day') setFilterType('day')
        if (value === 'week') setFilterType('week')
    }

    const handleCsvDownload = () => {
        if (!withdrawals.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).length) {
            return alert('There are no withdrawals')
        }
        const newWithdrawals = withdrawals.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).map(s => ({
            email: s.email,
            dateOfSubmission: s.createdAt
        }))
        Utils.downloadCsv(newWithdrawals, 'withdrawals.csv')
    }

    const filteredDropdown = (<>
      <Select defaultValue={'week'} style={{ width: '200px', height: '5vh' }} onChange={handleChange}>
          <Option key='day'>Last 24 Hours</Option>
          <Option key='week'>Last Week</Option>
      </Select>
    </>)

    const handleConfirmWithdrawal = (_id) => {
        Axios.post('/api/withdrawals/approve-withdrawal', { _id }).then(res => {
            alert(res.data.message)
            if (onWithdrawalConfirm) onWithdrawalConfirm({ target: { value: _id } });
        })
    }

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
            title: 'Confirm',
            dataIndex: 'confirm',
            key: 'confirm',
            render: (confirm, data) => <button className='dashboardNextButton' style={{ margin: '0', backgroundColor: '#f0ad4e' }} onClick={() => handleConfirmWithdrawal(data._id)}>Confirm</button>,
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
        amount: Utils.formatter.format(s.amount),
        createdAt: s.createdAt,
        confirm: s.status,
        _id: s._id
    }))
    return (
        <div >
            <div style={{ display: 'flex', margin: '0 10vw', justifyContent: 'space-between' }}>
                <h3>Pending Withdrawal Management</h3>
                <div className='downloadIcon' ><DownloadOutlined onClick={handleCsvDownload}/></div>
            </div>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default WithdrawalManagement
