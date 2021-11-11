import React, { useState } from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import Axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

function WithdrawalDialog({ onClose, visible, user }) {
    const [withdrawalAccountNumber, setWithdrawalAccountNumber] = useState("");
    const [accountType, setAccountType] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [isEditMode, setIsEditMode] = useState(true);
    const handleWithdrawalAccountNumberChange = (e) => {
        if (e.target.value.length >= 19) return e.preventDefault()
        if (withdrawalAccountNumber.length > e.target.value.length) return setWithdrawalAccountNumber(e.target.value)
        if (e.target.value.length === 2 || e.target.value.length === 7 || e.target.value.length === 14) {
            setWithdrawalAccountNumber(e.target.value + '-')
        } else {
            setWithdrawalAccountNumber(e.target.value)
        }
    }

    const handleEditClick = () => {
        setDisabled(false);
        setIsEditMode(false);
    }

    const handleAccountChange = (value) => {
        setAccountType(value);
        setDisabled(true);
        setIsEditMode(true);
        if (value === "nzdWithdrawalAccount") {
            if (user?.userData?.nzdWithdrawalAccount && user?.userData?.nzdWithdrawalAccount !== "") {
                setWithdrawalAccountNumber(user?.userData?.nzdWithdrawalAccount)
            } else {
                setWithdrawalAccountNumber("");
            }
        }
        else if (value === "usdWithdrawalAccount") {
            if (user?.userData?.usdWithdrawalAccount && user?.userData?.usdWithdrawalAccount !== "") {
                setWithdrawalAccountNumber(user?.userData?.usdWithdrawalAccount)
            } else {
                setWithdrawalAccountNumber("");
            }
        }
        else if (value === "audWithdrawalAccount") {
            if (user?.userData?.audWithdrawalAccount && user?.userData?.audWithdrawalAccount !== "") {
                setWithdrawalAccountNumber(user?.userData?.audWithdrawalAccount)
            } else {
                setWithdrawalAccountNumber("");
            }
        }
    }

    const handleSubmit = () => {
        setDisabled(true);
        setIsEditMode(true);
        if (accountType === "" || !accountType.trim()) {
            alert('Please select an account type');
            return
        }
        if (withdrawalAccountNumber === "" || !withdrawalAccountNumber.trim()) {
            alert('You should provide an account number');
            return
        }
        let userData = user?.userData;
        userData[accountType] = withdrawalAccountNumber
        Axios.post(`/api/users/update/${user.userData._id}`, userData)
        if (onClose) {
            onClose()
        }
        setAccountType('');
        setWithdrawalAccountNumber('');
    }
    const handleClose = () => {
        setDisabled(true);
        setIsEditMode(true);
        if (onClose) {
            onClose()
        }
        setAccountType('');
        setWithdrawalAccountNumber('');
    }

    return (
        <Dialog visible={visible} width={1000} onClose={handleClose}>
            <div className='accountCardTop' style={{ height: '500px', width: '100%', margin: '1vh', overflowY: 'scroll' }}>
                <p className='depositText'>Withdrawal</p>
                <div style={{ height:'50px' }}/>
                Select Account
                <br />
                <Select
                    style={{ width: '100%', background: 'linear-gradient(90deg, #5B9EA4 -11.44%, #CADEEA 68.31%)', height: '36px' }}
                    size={'large'}
                    defaultValue='nzdWithdrawalAccount'
                    onChange={handleAccountChange}
                >
                    <Option value="nzdWithdrawalAccount">&nbsp;NZD</Option>
                    <Option value="usdWithdrawalAccount">&nbsp;USD</Option>
                    <Option value="audWithdrawalAccount">&nbsp;AUD</Option>
                </Select>
                <div style={{ height:'50px' }}/>
                Available Funds
                <div style={{ height:'50px' }}/>
                <input value={withdrawalAccountNumber} disabled={user?.userData && user?.userData[`${accountType}`] !== '' && user?.userData[`${accountType}`] !== undefined ? disabled : false} onChange={handleWithdrawalAccountNumberChange} placeholder={`XX-XXXX-XXXXXXX-XXX`} className='withdrawlInput' width='100%'/>
                <br />
                <br />
                <div style={{  display:'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center' }}>
                    {!(user?.userData && user?.userData[`${accountType}`] !== '' && user?.userData[`${accountType}`] !== undefined && isEditMode) ?
                        <button className='dashboardNextButton' style={{ margin: '0' }} onClick={handleSubmit}>Submit</button>
                        :<button className='dashboardNextButton' style={{ margin: '0', backgroundColor: '#f0ad4e' }} onClick={handleEditClick}>Edit</button>
                    }
                    *24 hours stand down
                </div>
            </div>
        </Dialog>
    )
}

export default WithdrawalDialog
