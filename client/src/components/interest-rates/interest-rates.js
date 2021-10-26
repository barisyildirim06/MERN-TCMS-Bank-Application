import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd'
import Axios from 'axios';

function InterestRates({ interests, generals, rates }) {
    const [disabled, setDisabled] = useState({
        NZD: true,
        USD: true,
        AUD: true,
    })
    const [interestsState, setInterestsState] = useState([]);

    
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
            render: currency => interestsState?.length? <Input type='number' onChange={(e)=> handleInterestChange(e, currency)} disabled={disabled[currency]} value={interestsState?.find(i=> i.currency === currency)?.rate} style={{ width: '50%' }}/> : null
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
    ]
                
    const data = [
        {
            key: '1',
            item: 'NZD Account',
            rate: 'NZD',
            edit: 'NZD',
            calculated: (generals && interestsState?.length)? ((generals?.totalNzdAmount / rates?.NZD)* (interestsState?.find(i=> i.currency === 'NZD').rate / 100))?.toFixed(2) : null
        },
        {
            key: '2',
            item: 'USD Account',
            rate: 'USD',
            edit: 'USD',
            calculated: (generals && interestsState?.length)? ((generals?.totalUsdAmount) * (interestsState?.find(i=> i.currency === 'AUD').rate / 100))?.toFixed(2) : null
        },
        {
            key: '3',
            item: 'AUD Account',
            rate: 'AUD',
            edit: 'AUD',
            calculated:(generals && interestsState?.length)? ((generals?.totalAudAmount / rates?.AUD) * (interestsState?.find(i=> i.currency === 'AUD').rate / 100)).toFixed(2) : null
        },
    ];
    useEffect(() => {
        setInterestsState(interests);
    }, [interests])
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
