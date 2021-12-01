import React, { useState } from 'react'
import { Table, Select } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import { Utils } from 'utils';

const { Option } = Select;
function LeadManagement({ subscribers }) {
    const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
    const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);

    const [filterType, setFilterType] = useState('week');

    const handleChange = (value) => {
        if (value === 'day') setFilterType('day')
        if (value === 'week') setFilterType('week')
    }
    const handleCsvDownload = () => {
        if (!subscribers?.subscribers.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).length) {
            return alert('There are no subscribers')
        }
        const newSubscribers = subscribers?.subscribers.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).map(s => ({
            email: s.email,
            dateOfSubmission: s.createdAt
        }))
        Utils.downloadCsv(newSubscribers, 'subscribers.csv')
    }

    const filteredDropdown = (<>
      <Select defaultValue={'week'} style={{ width: '200px', height: '5vh' }} onChange={handleChange}>
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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

    const data = subscribers?.subscribers?.filter(s => new Date(s.createdAt).valueOf() > (filterType === 'day' ? oneDayUnix : sevenDaysUnix)).map((s,i) => ({
        key: i+1,
        number: i+1,
        email: s.email,
        createdAt: s.createdAt
    }))
    return (
        <div >
            <div style={{ display: 'flex', margin: '0 10vw', justifyContent: 'space-between' }}>
                <h3>Lead Management</h3>
                <div className='downloadIcon' ><DownloadOutlined onClick={handleCsvDownload}/></div>
            </div>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                <Table style={{ width: '80%' }} columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default LeadManagement
