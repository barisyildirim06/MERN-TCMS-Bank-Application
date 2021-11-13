import React, { useState, useEffect, useCallback } from 'react'
import { Table, Input } from 'antd'
import Axios from 'axios';
import { Utils } from 'utils';

function InterestRates({ interests, generals, rates }) {
    const [disabled, setDisabled] = useState({
        NZD: true,
        USD: true,
        AUD: true,
    })
    const [interestsState, setInterestsState] = useState([]);
    const [lastWeekReturns, setlastWeekReturns] = useState({ NZD: 0, USD: 0, AUD: 0 })
    const [calculatedReturn, setCalculatedReturn] = useState({ NZD: 0, USD: 0, AUD: 0 })
    const [confirmReturn, setConfirmReturn] = useState({ NZD: 0, USD: 0, AUD: 0 })

    const handleEditClick = (currency) => {
        let _disabled = { ...disabled };
        _disabled[currency] = false;
        setDisabled(_disabled)
    }

    const handleInterestChange = (e, currency) => {
        let _interestsRate = interestsState.map(i => {
            if (i._id === interestsState?.filter(i => i.currency === currency)[interestsState?.filter(i => i.currency === currency)?.length - 1]._id) {
                return { ...i, rate: e.target.value }
            }
            return i;
        })
        setInterestsState(_interestsRate);
    }

    // const calculateLastWeekInterest = useCallback((currency) => {
    //     const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
    //     const nowUnix = new Date().setDate((new Date()).getDate());

    //     let calculatedTime = 0
    //     let multipliedValue = 0
    //     if (interests.length) {
    //         const filteredInterests = interests.filter(el => el.currency === currency)
    //         filteredInterests.forEach((el, index) => {
    //             const createdAtUnix = new Date(el.createdAt).valueOf();
    //             if (index === 0) {
    //                 calculatedTime = calculatedTime + createdAtUnix - sevenDaysUnix
    //                 multipliedValue += (createdAtUnix - sevenDaysUnix) * el.rate
    //             }
    //             else if (index + 1 < filteredInterests.length) {
    //                 const nextCreatedAtUnix = new Date(filteredInterests[index + 1].createdAt).valueOf();
    //                 calculatedTime = calculatedTime + nextCreatedAtUnix - createdAtUnix
    //                 multipliedValue += (nextCreatedAtUnix - createdAtUnix) * el.rate
    //             }
    //             else {
    //                 calculatedTime = calculatedTime + nowUnix - createdAtUnix
    //                 multipliedValue += (nowUnix - createdAtUnix) * el.rate
    //             }
    //         })
    //         if (currency === 'NZD') return Utils.formatter.format(((generals?.totalNzdAmount) * (multipliedValue / calculatedTime) / (100 * 365.25 / 7)))
    //         else if (currency === 'USD') return Utils.formatter.format(((generals?.totalUsdAmount) * (multipliedValue / calculatedTime) / (100 * 365.25 / 7)))
    //         else if (currency === 'AUD') return Utils.formatter.format(((generals?.totalAudAmount) * (multipliedValue / calculatedTime) / (100 * 365.25 / 7)))
    //     }
    // }, [interests, generals]);

    const handleCalculatedReturn = useCallback((currency, formatted) => {
        if (generals && interestsState?.length) {
            if (formatted) {
                return Utils.formatter.format(((generals?.totalNzdAmount) * (interestsState?.filter(i => i.currency === currency)[interestsState?.filter(i => i.currency === currency)?.length - 1].rate / (100 * 365.25 / 7)))?.toFixed(2))
            }
            return ((generals?.totalNzdAmount) * (interestsState?.filter(i => i.currency === currency)[interestsState?.filter(i => i.currency === currency)?.length - 1].rate / (100 * 365.25 / 7)))?.toFixed(2)
        }
    }, [generals, interestsState]);

    const handleConfirmReturnChange = useCallback((e, currency) => {
        if (currency === 'NZD') setConfirmReturn({ ...confirmReturn, NZD: e.target.value });
        if (currency === 'USD') setConfirmReturn({ ...confirmReturn, USD: e.target.value });
        if (currency === 'AUD') setConfirmReturn({ ...confirmReturn, AUD: e.target.value });
    }, [confirmReturn]);

    const handleConfirm = async (currency) => {
        if (!window.confirm('Upon clicking apportion the confirmed return into each account as an INTEREST ACCRUED ledger item for each account? This action is irreversible.')) {
            return;
        }
        const interest = interestsState.filter(i => i.currency === currency)[interestsState.filter(i => i.currency === currency).length - 1];

        Axios.post('/api/interests/update', { currency: interest.currency, rate: interest.rate, confirmAmount: confirmReturn[currency] }).then(res => {
            if (res.data.success) {
                alert(res.data.message)
                let _disabled = { ...disabled };
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
            title: 'Last Week Return ($)',
            dataIndex: 'lastWeek',
            key: 'lastWeek',
        },
        {
            title: 'Current Interest Rate',
            dataIndex: 'rate',
            key: 'rate',
            render: currency => interestsState?.length ? <Input type='number' onChange={(e) => handleInterestChange(e, currency)} disabled={disabled[currency]} value={interestsState?.find(i => i.currency === currency).rate} style={{ width: '50%' }} /> : null
        },
        {
            title: 'Calculated Return ($)',
            dataIndex: 'calculated',
            key: 'calculated',
        },
        {
            title: 'Confirm Return ($)',
            dataIndex: 'confirm',
            key: 'confirm',
            render: currency => <Input onChange={(e) => handleConfirmReturnChange(e, currency)} disabled={disabled[currency]} value={confirmReturn[currency]} style={{ width: '50%' }} />
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: currency => disabled[currency] ? <button className='dashboardNextButton' style={{ margin: '0', backgroundColor: '#f0ad4e' }} onClick={() => handleEditClick(currency)}>Edit</button>
                : <button className='dashboardNextButton' style={{ margin: '0' }} onClick={() => handleConfirm(currency)}>Confirm</button>,
        }
    ]

    const data = [
        {
            key: '1',
            item: 'NZD Account',
            rate: 'NZD',
            edit: 'NZD',
            confirm: 'NZD',
            lastWeek: lastWeekReturns.NZD,
            calculated: calculatedReturn.NZD
        },
        {
            key: '2',
            item: 'USD Account',
            rate: 'USD',
            edit: 'USD',
            confirm: 'USD',
            lastWeek: lastWeekReturns.USD,
            calculated: calculatedReturn.USD
        },
        {
            key: '3',
            item: 'AUD Account',
            rate: 'AUD',
            edit: 'AUD',
            confirm: 'AUD',
            lastWeek: lastWeekReturns.AUD,
            calculated: calculatedReturn.AUD
        },
    ];
    useEffect(() => {
        setInterestsState(interests);
    }, [interests]);

    useEffect(() => {
        console.log(interestsState)
        if (interestsState.length) setlastWeekReturns(prevState => ({ ...prevState, NZD: interestsState?.find(i => i.currency === 'lastWeekNZD').confirmAmount, USD: interestsState?.find(i => i.currency === 'lastWeekUSD').confirmAmount, AUD: interestsState?.find(i => i.currency === 'lastWeekAUD').confirmAmount }))
    }, [interestsState])
    console.log(lastWeekReturns)
    useEffect(() => {
        setCalculatedReturn(prevState => ({ ...prevState, NZD: handleCalculatedReturn('NZD',true), USD: handleCalculatedReturn('USD',true), AUD: handleCalculatedReturn('AUD',true) }))
        setConfirmReturn(prevState => ({ ...prevState, NZD: handleCalculatedReturn('NZD'), USD: handleCalculatedReturn('USD'), AUD: handleCalculatedReturn('AUD') }))
    }, [interests, generals, handleCalculatedReturn])
    return (
        <div >
            <div style={{ display: 'flex', margin: '0 10vw' }}>
                <h3>Interest Rate Management</h3>
            </div>
            <div className='flex-center' style={{ flexDirection: 'column' }}>
                {interestsState && generals && rates &&
                    <Table style={{ width: '80%' }} columns={columns} pagination={false} dataSource={data} />
                }
            </div>
        </div>
    )
}

export default InterestRates
