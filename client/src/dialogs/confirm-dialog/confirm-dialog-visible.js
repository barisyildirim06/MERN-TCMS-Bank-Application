import React, { useState, useMemo } from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import { Checkbox, Upload } from 'antd';
import './confirm-dialog-visible.css'

function ConfirmDialog({ onClose, visible, setValues, onConfirm, values }) {
    const [fileList, setFileList] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([0,0,0,0,0,0,0,0,0,0]);
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    const handleCheckboxValueChange = (index) => {
        const newCheckboxValues = checkboxValues.map((v,i) => {
            if (index === i) return v ? 0 : 1
            return v;
        })
        setCheckboxValues(newCheckboxValues);
    }

    const computedValue = useMemo(() => {
        let computedBoolean = false;
        checkboxValues.forEach(el => {
            if (el) computedBoolean = true
        })
        return computedBoolean;
    }, [checkboxValues]);

    const test = {
        name: 'file',
        action: '/api/users/uploadImage',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
            setFileList(info.fileList.slice(-1))
            setValues(prevState => prevState = {...prevState, idimage: info?.fileList[0]?.response? info.fileList[0].response.fileName : ''})
        },
    };

    const handleConfirm = () => {
        if (!computedValue && (values.idimage === "" || !values.idimage.trim())) return alert('Please either check at least one item or upload Eligible Investor Certificate NZ');
        onConfirm()
        onClose()
    }

    return (
        <Dialog visible={visible} width={1000} onClose={handleClose}>
            <div className='accountCardTop' style={{ height: '80vh', width: '100%', margin: '1vh', overflowY: 'scroll' }}>
                <p className='depositText' style={{ lineHeight: '30px' }}>If you meet the criteria for one or more of the categories below, you are considered to be a wholesale investor</p>
                <Checkbox checked={checkboxValues[0]} onChange={() => handleCheckboxValueChange(0)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    1. You're an "eligible investor" because you have sufficient knowledge and experience dealing in financial products that enables you to assess the merits and risks of the transaction. Eligible investors are required to certify that they are an eligible investor by completing the TREASURY CAPITAL
                    MANAGEMENT SERVICES <a style={{ color: '#1890ff' }} href='static/img/investor-certificate.pdf' target='_blank'>Eligible Investor Certificate NZ</a> and having it certified by an independent lawyer, accountant, or financial adviser (unless you meet one of the other criteria below).
                </Checkbox>
                <Checkbox checked={checkboxValues[1]} onChange={() => handleCheckboxValueChange(1)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    2. Your net assets, combined with the assets of entities you control, exceeded $5 million for the 2 most recent financial years, or the total turnover of you and the entities you control exceeded $5 million for the 2 most recent financial years.
                </Checkbox>
                <Checkbox checked={checkboxValues[2]} onChange={() => handleCheckboxValueChange(2)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    3. You own, or at some time during the last 2 years have owned, a portfolio of "financial products" of a value of at least $1 million. Financial products include debt securities, equity securities, managed investment products, and derivatives.
                </Checkbox>
                <Checkbox checked={checkboxValues[3]} onChange={() => handleCheckboxValueChange(3)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    4. You have, during the last 2 years, carried out 1 or more transactions to acquire "financial products" where the amount payable under those transactions (in aggregate) is at least $1 million and the other parties to the transactions were not associated with you.
                </Checkbox>
                <Checkbox checked={checkboxValues[4]} onChange={() => handleCheckboxValueChange(4)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    5. Your principal business is investing in financial products.
                </Checkbox>
                <Checkbox checked={checkboxValues[5]} onChange={() => handleCheckboxValueChange(5)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    6. Your principal business is providing a financial adviser service in relation to financial products.
                </Checkbox>
                <Checkbox checked={checkboxValues[6]} onChange={() => handleCheckboxValueChange(6)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    7. You're in the business of trading in financial products on behalf of other people.
                </Checkbox>
                <Checkbox checked={checkboxValues[7]} onChange={() => handleCheckboxValueChange(7)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    8. Within the last 10 years you've been employed in an investment business and, for at least 2 years during that 10 year period, you participated in the investment decisions made by that investment business.
                </Checkbox>
                <Checkbox checked={checkboxValues[8]} onChange={() => handleCheckboxValueChange(8)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    9. You are a financial adviser in New Zealand and hold, or operate under, a Financial Advice Provider (FAP) licence.
                </Checkbox>
                <Checkbox checked={checkboxValues[9]} onChange={() => handleCheckboxValueChange(9)} style={{ display: 'flex', alignItems: 'baseline', fontSize: '20px' }}>
                    10. You're investing $750,000 or more into the company.
                </Checkbox>
                <br />
                <div style={{ fontSize: '20px' }}>
                    Please either check at least one item or upload Eligible Investor Certificate NZ from <Upload {...test} fileList={fileList} showUploadList={{ showRemoveIcon : false}}><a style={{ color: '#1890ff', fontSize: '20px' }} href= {() => false}>here.</a></Upload>
                </div>
                <br />
                <div className='flex-center'>
                    <button className='dashboardNextButton' style={{ margin: '0' }} onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </Dialog>
    )
}

export default ConfirmDialog
