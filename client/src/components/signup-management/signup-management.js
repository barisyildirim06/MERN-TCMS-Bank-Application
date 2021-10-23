import React, { useState } from 'react'
import { Table, Select } from 'antd'
import Axios from 'axios';

const { Option } = Select;
function SignupManagement({ users, onUserVerify }) {
    const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
    const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);

    const [filterType, setFilterType] = useState({ createdAt: 'week', verify: 'all' });

    const handleChange = (value, type) => {
        if (type === 'createdAt') {
            if (value === 'day') setFilterType(prevState => { return {...prevState, createdAt: 'day' }});
            if (value === 'week') setFilterType(prevState => { return {...prevState, createdAt: 'week' }});
        }
        if (type === 'verify') {
            if (value === 'verified') setFilterType(prevState => { return {...prevState, verify: 'verified' }});
            if (value === 'unapproved') setFilterType(prevState => { return {...prevState, verify: 'unapproved' }});
            if (value === 'all') setFilterType(prevState => { return {...prevState, verify: 'all' }});
        }
    }

    const handleVerifyClick = (_id) => {
        Axios.post('/api/users/verify-user', { _id }).then(res => {
            if (res.data.success && onUserVerify) onUserVerify({ target: { value: _id } })
            alert(res.data.message)
        })
    }

    const createdAtFilterDropdown = <>
      <Select defaultValue={'week'} style={{ width: '200px' }} onChange={(value) => handleChange(value,'createdAt')}>
          <Option key='day'>Last 24 Hours</Option>
          <Option key='week'>Last Week</Option>
      </Select>
    </>

    const filterVerifyDropdown = <>
      <Select defaultValue={'all'} style={{ width: '200px' }} onChange={(value) => handleChange(value,'verify')}>
          <Option key='verified'>Verified</Option>
          <Option key='unapproved'>Unapproved</Option>
          <Option key='all'>All Statuses</Option>
      </Select>
    </>

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
            render: (verified, data) => verified ? 'Verified' : <button className='dashboardNextButton' style={{ margin: '0', backgroundColor: '#f0ad4e' }} onClick={() => handleVerifyClick(data._id)}>Verify</button>,
            filterMultiple: false,
            filterDropdown: filterVerifyDropdown
        },
        {
            title: 'Date of Submission',
            dataIndex: 'createdAt',
            key: 'createdAt',
            filterMultiple: false,
            filterDropdown: createdAtFilterDropdown,
        }
    ]
    //
    const data = users.users
    .filter(u => new Date(u.createdAt).valueOf() > (filterType.createdAt === 'day' ? oneDayUnix : sevenDaysUnix))
    .filter(u => {
        const { verify } = filterType 
        if (verify === 'all') return true;
        if (verify === 'verified' && u.verified) return true;
        if (verify === 'unapproved' && !u.verified) return true;
        return false;
    })
    .map((s,i) => ({
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
