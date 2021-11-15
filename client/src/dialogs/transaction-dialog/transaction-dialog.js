import React from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import { DownloadOutlined } from '@ant-design/icons';
import './transaction-dialog.css'
import { Utils } from 'utils';

function TransactionDialog({ onClose, visible, transactionData }) {
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    const handleCsvDownload = () => {
        const newTransactions = transactionData?.map(el => ({
            transactionDate: el.transactionDate,
            transactionType: el.transactionType,
            amount: el.amount,
            currency: el.currency
        }))
        Utils.downloadCsv(newTransactions, 'transitionHistory.csv')
    }

    return (
        <Dialog visible={visible} width={1000} onClose={handleClose}>
            <div className='accountCardTop' style={{ height: '500px', width: '100%', margin: '1vh', overflowY: 'scroll'}}>
                <div style={{ display:'grid', gridTemplateColumns: '90% 10%' }}>
                    <p className='depositText' style={{ marginBottom: '0.5em', marginLeft: '5vw' }}>Recent Transactions</p>
                    <div className='downloadIcon' ><DownloadOutlined onClick={handleCsvDownload}/></div>
                    
                </div>
                <hr />
                <table style={{ width: '100%', overflowY: 'scroll' }}>
                    <tr>
                        <th style={{ width: '25%', textAlign: 'center' }}>Date</th>
                        <th style={{ width: '25%', textAlign: 'center' }}>Time</th>
                        <th style={{ width: '35%', textAlign: 'center' }}>Transaction Type</th>
                        <th style={{ width: '20%', textAlign: 'center' }}>Amount</th>
                        <th style={{ width: '20%', textAlign: 'center' }}>Currency</th>
                    </tr>
                    <br />
                    {transactionData?.sort((a, b) => new Date(b.createdAt)?.valueOf() - new Date(a.createdAt)?.valueOf())?.map(el => {
                            const addZero = (i) => {
                                if (i < 10) {i = "0" + i}
                                return i;
                            }
                            let hours = addZero(new Date(el?.createdAt).getHours()) + ":" + addZero(new Date(el?.createdAt).getMinutes());
                            return (<tr>
                                <td>{el?.transactionDate}</td>
                                <td>{hours}</td>
                                <td>{el?.transactionType}</td>
                                <td>{el?.amount?.toFixed(2)}</td>
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
