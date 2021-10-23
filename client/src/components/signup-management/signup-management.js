import React, { useState } from 'react'
import { Table, Select } from 'antd'
import Axios from 'axios';

const { Option } = Select;
function SignupManagement({ users, onUserVerify }) {
    const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
    const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);

    const [filterType, setFilterType] = useState('week');

    const handleChange = (value) => {
        if (value === 'day') setFilterType('day')
        if (value === 'week') setFilterType('week')
    }

    const handleVerifyClick = (_id) => {
        Axios.post('/api/users/verify-user', { _id }).then(res => {
            if (res.data.success && onUserVerify) onUserVerify({ target: { value: _id } })
            alert(res.data.message)
        })
    }

    const filteredDropdown = (<>
      <Select defaultValue={'day'} style={{ width: '200px' }} onChange={handleChange}>
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
            title: 'First Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Organization Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Verify',
            dataIndex: 'verify',
            key: 'verify',
            render: (verified, data) => verified ? 'Verified' : <button className='dashboardNextButton' style={{ margin: '0', backgroundColor: '#f0ad4e' }} onClick={() => handleVerifyClick(data._id)}>Verify</button>
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
    //
    const data = users.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).map((s,i) => ({
        key: i+1,
        number: i+1,
        name: s.name,
        lastname: s.lastname,
        email: s.email,
        verify: s.verified,
        phone: s.phone,
        companyName: s.companyName,
        createdAt: s.createdAt,
        _id: s._id
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

export default SignupManagement
