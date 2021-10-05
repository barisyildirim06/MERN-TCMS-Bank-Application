import React, { useState, useEffect } from 'react'
import './dashboardPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { USER_SERVER } from '../../Config';


function DashboardPage({ nzdAccount, usdAccount, audAccount, user }) {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentCurrency, setCurrentCurrency] = useState('NZD')
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleNzdClick = () => {
        setCurrentAccount(nzdAccount)
        setCurrentCurrency('NZD');
    }
    const handleUsdClick = () => {
        setCurrentAccount(usdAccount)
        setCurrentCurrency('USD');
    }
    const handleAudClick = () => {
        setCurrentAccount(audAccount)
        setCurrentCurrency('AUD');
    }

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {

        });
    };

    useEffect(() => {
        setCurrentAccount(nzdAccount)
    }, [nzdAccount]);

    return (
        <div className='dashboardContainer'>
            <div className='dashboardLeftNav'>
                <div>
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
                    <p style={{ height: '25vh' }}><a onClick={handleNzdClick}>NZD</a><a onClick={handleUsdClick}>USD</a><a onClick={handleAudClick}>AUD</a><a style={{ fontSize: '14px' }}>Withdrawal</a><a style={{ fontSize: '14px' }}>Deposit</a><a style={{ fontSize: '14px' }}>Transaction History</a></p>
                    <div style={{ height: '35vh', display: 'flex', flexDirection: 'column-reverse'}}>
                        <Link to='/login' style={{color:'white', fontSize: '16px'}} onClick={logoutHandler}>Logout</Link>
                    </div>
                </div>
            </div>
            <div className='dashboardRight'>
                <div className='accountCardTop'>
                    <div>{currentCurrency} Account</div>
                    <br />
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
                </div>
                <div className='accountCardBottom'>
                
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
