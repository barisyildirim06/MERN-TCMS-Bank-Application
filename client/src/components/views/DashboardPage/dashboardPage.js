import React, { useState, useEffect, useCallback } from 'react'
import './dashboardPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import NavBar from '../NavBar/NavBar'
import { Slider, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive'
import WithdrawalDialog from '../../../dialogs/withdrawal-dialog/withdrawal-dialog';
import DepositDialog from '../../../dialogs/deposit-dialog/deposit-dialog';
import TransactionDialog from '../../../dialogs/transaction-dialog/transaction-dialog';


function DashboardPage({ nzdAccount, usdAccount, audAccount, user, general }) {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentCurrency, setCurrentCurrency] = useState('NZD');
    const [amount, setAmount] = useState('');
    const [persentage, setPersentage] = useState(0);
    const [currentPage, setCurrentPage] = useState('Summary');
    const [withdrawalDialogVisible, setWithdrawalDialogVisible] = useState(false);
    const [depositDialogVisible, setDepositDialogVisible] = useState(false);
    const [transactionDialogVisible, setTransactionDialogVisible] = useState(false);
    const [nzdAcc, setNzdAcc] = useState(null);
    const [usdAcc, setUsdAcc] = useState(null);
    const [audAcc, setAudAcc] = useState(null);
    const [transactionData, setTransactionData] = useState(general);

    const handleNavClose = useCallback(() => {
        document.getElementById("mySidenav").style.width = "0px"
        document.getElementById("marginLeft").style.paddingLeft = "0px"
    }, []);
    
    const isBigEnough = useMediaQuery({
        query: '(min-width: 1000px)'
    })
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleSummaryClick = () => {
        handleNavClose();
        setCurrentPage('Summary');
    }

    const handleNzdClick = () => {
        handleNavClose();
        setCurrentAccount(nzdAcc)
        setCurrentCurrency('NZD');
        setAmount('');
        setCurrentPage('Account');
    }

    const handleUsdClick = () => {
        handleNavClose();
        setCurrentAccount(usdAcc)
        setCurrentCurrency('USD');
        setAmount('');
        setCurrentPage('Account');
    }
    const handleAudClick = () => {
        handleNavClose();
        setCurrentAccount(audAcc)
        setCurrentCurrency('AUD');
        setAmount('');
        setCurrentPage('Account');
    }

    const handleWithdrawalDialogClick = () => {
        setWithdrawalDialogVisible(true);
        handleNavClose();
    }
    const handleWithdrawalDialogClose = () => {
        setWithdrawalDialogVisible(false);
    }

    const logoutHandler = () => {
        handleNavClose();
        axios.get(`${USER_SERVER}/logout`).then(response => {
            
        });
    };
    

    const handleSliderChange = (value) => {
        setPersentage(value[1]);
        if(currentAccount?.availableBalance) {
            setAmount((currentAccount.availableBalance * value[1] / 100)?.toFixed(2))
        }
    }

    const handleSubmit = () => {
        let today = new Date().toISOString().split('T')[0]
        const data = {
            account: user?.userData?._id,
            amount: amount * -1,
            dateSubmitted: today,
            status: 'Pending',
            dateConfirmed: '',
            currency: currentCurrency
        }
        axios.post(`/api/withdrawals/create`, data).then(res => {
            if (res.data.success) {
                const newPendingWithdrawal = currentAccount.pendingWithdrawls - amount;
                const newAvailableBalance = currentAccount.availableBalance - amount;
                setCurrentAccount({...currentAccount, pendingWithdrawls: newPendingWithdrawal, availableBalance: newAvailableBalance});
                if (currentCurrency === 'NZD') setNzdAcc({...currentAccount, pendingWithdrawls: newPendingWithdrawal, availableBalance: newAvailableBalance});
                if (currentCurrency === 'USD') setUsdAcc({...currentAccount, pendingWithdrawls: newPendingWithdrawal, availableBalance: newAvailableBalance});
                if (currentCurrency === 'AUD') setAudAcc({...currentAccount, pendingWithdrawls: newPendingWithdrawal, availableBalance: newAvailableBalance});
            }
        })
    }


    const handleDepositDialogClick = () => {
        handleNavClose();
        setDepositDialogVisible(true);
    }

    const handleDepositDialogClose = () => {
        handleNavClose();
        setDepositDialogVisible(false);
    }

    const handleTransactionDialogClick = () => {
        handleNavClose();
        setTransactionDialogVisible(true);
    }

    const handleTransactionDialogClose = () => {
        setTransactionData(general);
        handleNavClose();
        setTransactionDialogVisible(false);
    }

    const handleAccountTransactionHistoryClick = () => {
        setTransactionData(general?.filter(el => el.currency === currentCurrency));
        handleNavClose();
        setTransactionDialogVisible(true);
    }

    const handleSupportClick = () => {
        handleNavClose();
        Modal.info({
            title: 'Support',
            content: (
              <div>
                <p>We provide personalised support for all our clients, if you are having any trouble contact us at <a href = "mailto: support@tcms.co.nz" style={{ color: 'black' }}>support@tcms.co.nz</a> </p>
              </div>
            ),
            onOk() {},
            width: '1000px'
          });
    }

    useEffect(() => {
        setCurrentAccount(nzdAccount);
        setNzdAcc(nzdAccount);
        setUsdAcc(usdAccount);
        setAudAcc(audAccount);
    }, [nzdAccount, usdAccount, audAccount]);

    useEffect(() => {
        if (isBigEnough) {
            handleNavClose();
        }
    }, [handleNavClose, isBigEnough])

    return (
        <div id='dashboardContainer'>
            {!isBigEnough?
                <NavBar hasSideNavIcon={true}/> : null
            }
            <div id="mySidenav" className="dashboardSideNav">
                <div>
                    <div style={{ height: '7vh', display: 'flex', alignItems:'center', justifyContent:'end' }}>
                        <button className='dashboardNextButton' style={{ margin: '0' }} onClick={handleNavClose}>X</button>
                    </div>
                    <div style={{ height: '12vh' }}>
                        <img src={`/static/img/${user?.userData?.image? user?.userData?.image : 'user.png'}`} alt="12344" style={{ color: '#e7eced', backgroundColor: 'grey', height:'12vh', width: '12vh', padding:'1vh 1vh 1vh 1vh', borderRadius: '50%' }}/>
                    </div>
                    <div style={{ height: '2vh' }}/>
                    <div style={{ height: '15vh' }}>
                        <div style={{color:'white', fontSize: '16px'}}>{user?.userData?.companyName}</div>
                        {user?.userData?.verified? <p className='verifiedText'>Verified</p> : <span ><p className='unapprovedText'>Unapproved</p><Link to='/verify' onClick={handleNavClose}>(Verify Your Account)</Link></span>}
                    </div>
                    <div style={{ height: '2vh' }}/>
                    <p style={{ height: '25vh' }}><a href={() => false} onClick={handleSummaryClick}>Summary</a><a href={() => false} onClick={handleNzdClick}>NZD</a><a href={() => false} onClick={handleUsdClick}>USD</a><a href={() => false} onClick={handleAudClick}>AUD</a><a href={() => false} onClick={handleWithdrawalDialogClick} style={{ fontSize: '14px' }}>Withdrawal</a><a href={() => false} onClick={handleDepositDialogClick} style={{ fontSize: '14px' }}>Deposit</a><a href={() => false} onClick={handleTransactionDialogClick} style={{ fontSize: '14px' }}>Transaction History</a></p>
                    <div style={{ height: '35vh', display: 'flex', flexDirection: 'column-reverse'}}>
                        <Link to='/login' style={{color:'white', fontSize: '16px'}} onClick={logoutHandler}>Logout</Link>
                        <a href = {() => false} onClick={handleSupportClick} style={{color:'white', fontSize: '16px'}}>Support</a>
                        <Link onClick={handleNavClose} to='/' style={{color:'white', fontSize: '16px'}}>Home</Link>
                    </div>
                </div>
            </div>
            <div className='dashboardLeftNav'>
                <div style={{ height: '7vh' }}/>
                <div style={{ height: '12vh' }}>
                    <img src={`/static/img/${user?.userData?.image? user?.userData?.image : 'user.png'}`} alt="12344" style={{ color: '#e7eced', backgroundColor: 'grey', height:'12vh', width: '12vh', padding:'1vh 1vh 1vh 1vh', borderRadius: '50%' }}/>
                </div>
                <div style={{ height: '2vh' }}/>
                <div style={{ height: '15vh' }}>
                    <div style={{color:'white', fontSize: '16px'}}>{user?.userData?.companyName}</div>
                    {user?.userData?.verified? <p className='verifiedText'>Verified</p> : <span ><p className='unapprovedText'>Unapproved</p><Link to='/verify'>(Verify Your Account)</Link></span>}
                </div>
                <div style={{ height: '2vh' }}/>
                <p style={{ height: '25vh' }}><a href={() => false} onClick={handleSummaryClick}>Summary</a><a href={() => false} onClick={handleNzdClick}>NZD</a><a href={() => false} onClick={handleUsdClick}>USD</a><a href={() => false} onClick={handleAudClick}>AUD</a><a href={() => false} onClick={handleWithdrawalDialogClick} style={{ fontSize: '14px' }}>Withdrawal</a><a href={() => false} onClick={handleDepositDialogClick} style={{ fontSize: '14px' }}>Deposit</a><a href={() => false} onClick={handleTransactionDialogClick} style={{ fontSize: '14px' }}>Transaction History</a></p>
                <div style={{ height: '35vh', display: 'flex', flexDirection: 'column-reverse'}}>
                    <Link to='/login' style={{color:'white', fontSize: '16px'}} onClick={logoutHandler}>Logout</Link>
                    <a href = {() => false} onClick={handleSupportClick} style={{color:'white', fontSize: '16px'}}>Support</a>
                        <Link onClick={handleNavClose} to='/' style={{color:'white', fontSize: '16px'}}>Home</Link>
                </div>
            </div>
            <div className='dashboardRight'>
                {currentPage === 'Summary' &&
                    <div className='accountCardTop' style={{ height: '450px' }}>
                        <div style={{ height: '12vh', marginTop: '2vh' }}>
                            <img src={`/static/img/${user?.userData?.image? user?.userData?.image : 'user.png'}`} alt="12344" style={{ color: '#e7eced', backgroundColor: 'grey', height:'12vh', width: '12vh', padding:'1vh 1vh 1vh 1vh', borderRadius: '50%' }}/>
                        </div>
                        <div style={{fontSize: '16px', color: 'black', marginTop: '2vh', fontWeight:'bold'}}>{user?.userData?.companyName}</div>
                        <br />
                        <div>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '25%', textAlign: 'center' }}>Balance</th>
                                        <th style={{ width: '45%', textAlign: 'left' }}>{nzdAcc?.availableBalance ? nzdAcc?.availableBalance + usdAcc?.availableBalance + audAcc?.availableBalance : null}$</th>
                                        <th style={{ width: '10%' }}>Yield</th>
                                        <th style={{ width: '10%', textAlign: 'center' }}>0.00%</th>
                                    </tr>
                                </thead>
                            </table>
                            <hr />
                            <br />
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '25%', textAlign: 'center', fontSize: '14px' }}>NZD ACCOUNT</td>
                                        <td style={{ width: '45%', textAlign: 'left' }}>${nzdAcc?.availableBalance}</td>
                                        <td style={{ width: '10%' }}></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}>0.00%</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '25%', textAlign: 'center', fontSize: '14px' }}>USD ACCOUNT</td>
                                        <td style={{ width: '45%', textAlign: 'left' }}>${usdAcc?.availableBalance}</td>
                                        <td style={{ width: '10%' }}></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}>0.00%</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '25%', textAlign: 'center', fontSize: '14px' }}>AUD ACCOUNT</td>
                                        <td style={{ width: '45%', textAlign: 'left' }}>${audAcc?.availableBalance}</td>
                                        <td style={{ width: '10%' }}></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}>0.00%</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                    </div>
                }
                {currentPage === 'Account' &&
                    <div>
                        <div className='accountCardTop'>
                            <div>{currentCurrency} Account</div>
                            <br />
                            <div className='accountCardRows'>
                                <div>
                                    Principal:
                                </div>
                                <div>
                                    {currentAccount?.principal !== undefined ? formatter.format(currentAccount?.principal): null}
                                </div>
                            </div>
                            <div className='accountCardRows'>
                                <div>
                                    Interest Acrrued:
                                </div>
                                <div>
                                    {currentAccount?.interestAcrrued  !== undefined ?  formatter.format(currentAccount?.interestAcrrued): null}
                                </div>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div className='accountCardRows'>
                                <div>
                                    Fees:
                                </div>
                                <div>
                                    {currentAccount?.fees  !== undefined ?  formatter.format(currentAccount?.fees): null}
                                </div>
                            </div>
                            <div className='accountCardRows'>
                                <div>
                                    Withdrawls:
                                </div>
                                <div>
                                    {currentAccount?.withdrawls  !== undefined ?  formatter.format(currentAccount?.withdrawls): null}
                                </div>
                            </div>
                            <div className='accountCardRows'>
                                <div>
                                    Pending Withdrawls:
                                </div>
                                <div>
                                    {currentAccount?.pendingWithdrawls !== undefined ?  formatter.format(currentAccount?.pendingWithdrawls): null}
                                </div>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div className='accountCardRows'>
                                <div>
                                    Available Balance:
                                </div>
                                <div>
                                    {currentAccount?.availableBalance !== undefined ?  formatter.format(currentAccount?.availableBalance): null}
                                </div>
                            </div>
                            <div style={{ display:'flex', justifyContent: 'center' }}>
                                <button className='dashboardNextButton' style={{ width: '240px' }} onClick={handleAccountTransactionHistoryClick}>Transaction History</button>
                            </div>
                        </div>
                        <div className='accountCardBottom'>
                            <p>Withdrawal</p>
                            <div style={{ height: '2vh' }}/>
                            <div className='withdrawalInputContainer'>
                                <input value={amount} placeholder={`Amount ${currentCurrency}`} className='withdrawlInput' width='100%'/>
                                <span className="dolarSuffix">$</span>
                            </div>
                            <div style={{ height: '2vh' }}/>
                            <Slider range defaultValue={[0,0]} onChange={handleSliderChange}/>
                            <div style={{ display:'flex', flexDirection:'row-reverse' }}>{`${persentage}%`}</div>
                            <button className='dashboardNextButton' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                }
            </div>
            <WithdrawalDialog 
                visible={withdrawalDialogVisible}
                onClose={handleWithdrawalDialogClose}
                user={user}
            />
            <DepositDialog 
                visible={depositDialogVisible}
                onClose={handleDepositDialogClose}
            />
            <TransactionDialog 
                visible={transactionDialogVisible}
                currentCurrency={currentCurrency}
                onClose={handleTransactionDialogClose}
                transactionData={transactionData}
            />
        </div>
    )
}

export default DashboardPage
