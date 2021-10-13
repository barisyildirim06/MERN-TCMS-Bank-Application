import React from 'react'
import Dialog from '../../components/dialog/dialog/dialog'

function TransactionDialog({ onClose, visible, transactionData, currentCurrency }) {
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <Dialog visible={visible} width={1000} onClose={handleClose}>
            <div className='accountCardTop' style={{ height: '500px', width: '100%', margin: '1vh', overflowY: 'scroll'}}>
                <p className='depositText'>Recent Transactions</p>
                <hr />
                <table style={{ width: '100%', overflowY: 'scroll' }}>
                    <tr>
                        <th style={{ width: '25%', textAlign: 'center' }}>Date</th>
                        <th style={{ width: '35%', textAlign: 'center' }}>Transaction Type</th>
                        <th style={{ width: '20%', textAlign: 'center' }}>Amount</th>
                        <th style={{ width: '20%', textAlign: 'center' }}>Currency</th>
                    </tr>
                    <br />
                    {transactionData?.map(el => {
                            return (<tr>
                                <td>{el?.transactionDate}</td>
                                <td>{el?.transactionType}</td>
                                <td>{el?.amount}</td>
                                <td>{el?.currency}</td>
                            </tr>)
                        })
                    }
                </table>
                {/* <div style={{ display:'flex', justifyContent: 'center' }}>
                    <button className='dashboardNextButton' onClick={handleLoadMore}>Load More</button>
                </div> */}
            </div>
        </Dialog>
    )
}

export default TransactionDialog
