import React, { useState } from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import { Select } from 'antd';
const { Option } = Select;

function WithdrawalDialog({ onClose, visible }) {
    const [withdrawalAccountNumber, setWithdrawalAccountNumber] = useState("");
    const handleWithdrawalAccountNumberChange = (e) => {
        setWithdrawalAccountNumber(e.target.value)
    }

    const handleSubmit = () => {
        if (onClose) {
            onClose()
        }
    }
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <Dialog visible={visible} width={1000} onClose={handleClose}>
            <div className='accountCardTop' style={{ height: '500px', width: '100%', margin: '1vh', overflowY: 'scroll', overflowY: 'scroll' }}>
                <p className='depositText'>Withdrawal</p>
                <div style={{ height:'50px' }}/>
                <Select
                    style={{ width: '100%', background: 'linear-gradient(90deg, #5B9EA4 -11.44%, #CADEEA 68.31%)' }}
                    placeholder="&nbsp;Select Account"
                    size={'large'}
                >
                    <Option value="NZD">&nbsp;NZD</Option>
                    <Option value="USD">&nbsp;USD</Option>
                    <Option value="AUD">&nbsp;AUD</Option>
                </Select>
                <div style={{ height:'50px' }}/>
                Available Funds
                <div style={{ height:'50px' }}/>
                {/* <div className='withdrawalInputContainer'> */}
                    <input value={withdrawalAccountNumber} onChange={handleWithdrawalAccountNumberChange} placeholder={`Account Number`} className='withdrawlInput' width='100%'/>
                {/* </div> */}
                <br />
                <br />
                <div style={{  display:'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center' }}>
                    <button className='dashboardNextButton' style={{ margin: '0' }} onClick={handleSubmit}>Submit</button>
                    *24 hours stand down
                </div>
            </div>
        </Dialog>
    )
}

export default WithdrawalDialog
