import React, { useState } from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import { Input } from 'antd';
import Axios from 'axios';

function MoneyTransferDialog({ onClose, visible, currentCurrency, onSave }) {
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }
    const [values, setValues] = useState({
        accountID: '',
        transactionType: 'TRANSFER',
        amount: ''
    });

    const handleChange = (e, param) => {
        if (param === 'accountID') {
            let _values = { ...values, accountID: e.target.value }
            setValues(_values)
        }
        else if (param === 'amount') {
            let _values = { ...values, amount: e.target.value }
            setValues(_values)
        }
    };

    const handleSubmit = async () => {
        const _values = { ...values, currency: currentCurrency }
        const request = await Axios.post('/api/transfers/create', _values);
        alert(request.data.message);
        handleClose();
        if (onSave) {
            onSave(values.amount)
        }
    }

    return (
        <Dialog visible={visible} width={600} onClose={handleClose}>
            <div className='accountCardTop' style={{ width: '100%', margin: '1vh' }}>
                <p className='depositText'>Create New Ledger</p>
                <label>AccountID</label>
                <Input type='number' value={values.accountID} style={{ marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'accountID')} />
                <label>Currency</label>
                <Input disabled={true} value={currentCurrency} style={{ marginTop: '1vh', fontSize: '20px' }} />
                <label>Transaction Type</label>
                <Input disabled={true} value='Transfer' style={{ marginTop: '1vh', fontSize: '20px' }} />
                <label>Amount</label>
                <Input type='number' value={values.amount} style={{ marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'amount')} />
                <br />
                <div className='flex-center'>
                    <button className='dashboardNextButton' style={{ margin: '20px 0 0 0' }} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </Dialog>
    )
}

export default MoneyTransferDialog
