import React from 'react'
import Dialog from '../../components/dialog/dialog/dialog'
import { DownloadOutlined } from '@ant-design/icons';
import './transaction-dialog.css'

function TransactionDialog({ onClose, visible, transactionData }) {
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    const objectToCsv = (data) => {
        let csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map(header => {
                const escaped = (''+row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`
            })
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    }

    const download = (data) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute("download", "transitionHistory.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleCsvDownload = () => {
        const newTransactions = transactionData?.map(el => ({
            transactionDate: el.transactionDate,
            transactionType: el.transactionType,
            amount: el.amount,
            currency: el.currency
        }))
        const csvData = objectToCsv(newTransactions);
        download(csvData)
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
