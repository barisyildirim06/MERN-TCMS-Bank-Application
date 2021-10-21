import React, { useState } from 'react'
import { Table, Input } from 'antd'
import Axios from 'axios';

function InterestRates({ interests, generals, rates }) {
    const [disabled, setDisabled] = useState({
        NZD: true,
        USD: true,
        AUD: true,
    })
    const [interestsState, setInterestsState] = useState(interests);

    const handleEditClick = (currency) => {
        let _disabled = {...disabled};
        _disabled[currency] = false;
        setDisabled(_disabled)
    }

    const handleInterestChange = (e, currency) => {
        let _interestsRate = interestsState.map(i => {
            if (i.currency === currency) return {...i, rate: e.target.value}
            return i;
        })
        setInterestsState(_interestsRate);
    }

    const handleConfirm = async (currency) => {
        if (!window.confirm('Upon clicking apportion the confirmed return into each account as an INTEREST ACCRUED ledger item for each account? This action is irreversible.')) {
            return;
        }
        Axios.post('/api/interests/update', interestsState.find(i => i.currency === currency)).then(res => {
            if (res.data.success) {
                alert(res.data.message)
                let _disabled = {...disabled};
                _disabled[currency] = true;
                setDisabled(_disabled)
            }
        })
    }

    const columns = [
        {
          title: 'Item',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'Current Interest Rate',
          dataIndex: 'rate',
          key: 'rate',
          render: currency => <Input type='number' onChange={(e)=> handleInterestChange(e, currency)} disabled={disabled[currency]} value={interestsState?.find(i=> i.currency === currency)?.rate} style={{ width: '50%' }}/>
        },
        {
          title: 'Calculated Return ($)',
          dataIndex: 'calculated',
          key: 'calculated',
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: currency => disabled[currency] ? <button className='dashboardNextButton' style={{ margin: '0', backgroundColor: '#f0ad4e' }} onClick={() => handleEditClick(currency)}>Edit</button>
            :<button className='dashboardNextButton' style={{ margin: '0' }} onClick={() => handleConfirm(currency)}>Confirm</button>,
        }
        // {
        //   title: 'CalculatedReturn',
        //   dataIndex: 'usd',
        //   key: 'usd',
        // },
        // {
        //   title: 'AUD Accounts (AUD)',
        //   dataIndex: 'aud',
        //   key: 'aud',
        // },
        // {
        //   title: 'Sum of All Acounts ($)',
        //   dataIndex: 'sum',
        //   key: 'sum',
        // },
    ]

    const data = [
        {
            key: '1',
            item: 'NZD Account',
            rate: 'NZD',
            edit: 'NZD',
            calculated: ((generals?.totalNzdAmount / rates?.NZD) * (interestsState?.find(i=> i.currency === 'NZD').rate / 100))?.toFixed(2)
        },
        {
            key: '2',
            item: 'USD Account',
            rate: 'USD',
            edit: 'USD',
            calculated: ((generals?.totalUsdAmount) * (interestsState?.find(i=> i.currency === 'AUD').rate / 100))?.toFixed(2)
        },
        {
            key: '3',
            item: 'AUD Account',
            rate: 'AUD',
            edit: 'AUD',
            calculated: ((generals?.totalAudAmount / rates?.AUD) * (interestsState?.find(i=> i.currency === 'AUD').rate / 100)).toFixed(2)
        },
    ];
    return (
        <div >
            <label htmlFor="KeyFinancialStats">Set Current Interest Rate on Accounts</label>
            <div  className='flex-center' style={{ flexDirection: 'column' }}>
                {interestsState && generals && rates &&
                    <Table style={{ width: '80%' }} columns={columns} pagination={false} dataSource={data}/>
                }
            </div>
        </div>
    )
}

export default InterestRates
