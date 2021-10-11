import React from 'react'
import Dialog from '../../components/dialog/dialog/dialog'

function DepositDialog({ onClose, visible }) {
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <Dialog visible={visible} width={1000} onClose={handleClose}>
            <div className='accountCardTop' style={{ height: '350px', width: '100%', margin: '1vh' }}>
                <p className='depositText'>Deposit</p>
                <br /><br />
                <p className='depositInnerText'>Deposit your money into this account number provided using your TCMS account number as reference.</p>
                <br /><br /><hr /><br /><br />
                <div style={{  display:'flex', justifyContent:'center' }}>
                    <button className='dashboardNextButton' style={{ margin: '0' }} onClick={handleClose}>Close</button>
                </div>
            </div>
        </Dialog>
    )
}

export default DepositDialog
