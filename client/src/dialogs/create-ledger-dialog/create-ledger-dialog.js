import React, { useState } from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import { Input, Select } from 'antd';
import './create-ledger-dialog.css'
import Axios from 'axios';

const { Option } = Select;
function CreateLedgerDialog({ onClose, visible }) {
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }
    const [values, setValues] = useState({
        accountID: '',
        currency: 'NZD',
        transactionType: 'CREDIT',
        amount: ''
    });

    const handleChange = (e, param) => {
        if (param === 'accountID') {
            if (e.target.value.length >= 9) return e.preventDefault(); 
            let _values = {...values, accountID: e.target.value}
            setValues(_values)
        }
        else if (param === 'currency') {
            if (e === 'NZD') setValues(prevState => { return {...prevState, currency: 'NZD' }});
            if (e === 'USD') setValues(prevState => { return {...prevState, currency: 'USD' }});
            if (e === 'AUD') setValues(prevState => { return {...prevState, currency: 'AUD' }});
        }
        else if (param === 'transactionType') {
            if (e === 'CREDIT') setValues(prevState => { return {...prevState, transactionType: 'CREDIT' }});
            if (e === 'FEES') setValues(prevState => { return {...prevState, transactionType: 'FEES' }});
        }
        else if (param === 'amount') {
            let _values = {...values, amount: e.target.value}
            setValues(_values)
        }
    };

    const handleSubmit = async () => {
        const request = await Axios.post('/api/generals/create', values);
        alert(request.data.message);
        handleClose();
    }

    return (
        <Dialog visible={visible} width={600} onClose={handleClose}>
            <div className='accountCardTop' style={{  width: '100%', margin: '1vh' }}>
                <p className='depositText'>Create New Ledger</p>
                <label>AccountID</label>
                <Input value={values.accountID} style={{  marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'accountID')}/>
                <label>Currency</label>
                <Select defaultValue={'nzd'} style={{ width: '100%', backgroundColor: 'white', marginTop: '1vh', fontSize: '20px', height: '36px' }} onChange={(e) => handleChange(e,'currency')}>
                    <Option key='NZD'>NZD</Option>
                    <Option key='USD'>USD</Option>
                    <Option key='AUD'>AUD</Option>
                </Select>
                <label>Transaction Type</label>
                <Select defaultValue={'CREDIT'} style={{ width: '100%', backgroundColor: 'white', marginTop: '1vh', fontSize: '20px', height: '36px' }} onChange={(e) => handleChange(e,'transactionType')}>
                    <Option key='CREDIT'>Credit</Option>
                    <Option key='FEES'>Fee / Refund</Option>
                </Select>
                <label>Amount</label>
                <Input type='number' value={values.amount} style={{  marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'amount')}/>
                <br />
                <div className='flex-center'>
                    <button className='dashboardNextButton' style={{ margin: '20px 0 0 0' }} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateLedgerDialog
