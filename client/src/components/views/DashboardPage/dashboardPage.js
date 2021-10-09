import React, { useState, useEffect } from 'react'
import './dashboardPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import NavBar from '../NavBar/NavBar'
import { Slider, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive'


function DashboardPage({ nzdAccount, usdAccount, audAccount, user }) {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentCurrency, setCurrentCurrency] = useState('NZD')
    const [amount, setAmount] = useState('');
    const [persentage, setPersentage] = useState(0);

    const handleNavClose = () => {
        document.getElementById("mySidenav").style.width = "0px"
        document.getElementById("marginLeft").style.paddingLeft = "0px"
    }
    
    const isBigEnough = useMediaQuery({
        query: '(min-width: 1000px)'
    })
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleNzdClick = () => {
        handleNavClose();
        setCurrentAccount(nzdAccount)
        setCurrentCurrency('NZD');
        setAmount('');
    }
    const handleUsdClick = () => {
        handleNavClose();
        setCurrentAccount(usdAccount)
        setCurrentCurrency('USD');
        setAmount('');
    }
    const handleAudClick = () => {
        handleNavClose();
        setCurrentAccount(audAccount)
        setCurrentCurrency('AUD');
        setAmount('');
    }
    
    const logoutHandler = () => {
        handleNavClose();
        axios.get(`${USER_SERVER}/logout`).then(response => {
            
        });
    };
    

    const handleSliderChange = (value) => {
        setPersentage(value[1]);
        if(currentAccount?.availableBalance) {
            setAmount(currentAccount.availableBalance * value[1] / 100)
        }
    }

    const handleSubmit = () => {

    }

    const handleSupportClick = () => {
        Modal.info({
            title: 'Support',
            content: (
              <div>
                <p>We provide personalised support for all our clients, if you are having any trouble contact us at <a href = "mailto: support@tcms.co.nz" style={{ color: 'black' }}>support@tcms.co.nz</a> </p>
              </div>
            ),
            onOk() {},
          });
    }

    useEffect(() => {
        setCurrentAccount(nzdAccount)
    }, [nzdAccount]);

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
                    <p style={{ height: '25vh' }}><a onClick={handleNzdClick}>NZD</a><a onClick={handleUsdClick}>USD</a><a onClick={handleAudClick}>AUD</a><a style={{ fontSize: '14px' }}>Withdrawal</a><a style={{ fontSize: '14px' }}>Deposit</a><a style={{ fontSize: '14px' }}>Transaction History</a></p>
                    <div style={{ height: '35vh', display: 'flex', flexDirection: 'column-reverse'}}>
                        <Link onClick={handleNavClose} to='/login' style={{color:'white', fontSize: '16px'}} onClick={logoutHandler}>Logout</Link>
                        <a href="#" onClick={handleSupportClick} style={{color:'white', fontSize: '16px'}}>Support</a>
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
                <p style={{ height: '25vh' }}><a onClick={handleNzdClick}>NZD</a><a onClick={handleUsdClick}>USD</a><a onClick={handleAudClick}>AUD</a><a style={{ fontSize: '14px' }}>Withdrawal</a><a style={{ fontSize: '14px' }}>Deposit</a><a style={{ fontSize: '14px' }}>Transaction History</a></p>
                <div style={{ height: '35vh', display: 'flex', flexDirection: 'column-reverse'}}>
                    <Link onClick={handleNavClose} to='/login' style={{color:'white', fontSize: '16px'}} onClick={logoutHandler}>Logout</Link>
                    <a href="#" onClick={handleSupportClick} style={{color:'white', fontSize: '16px'}}>Support</a>
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
        </div>
    )
}

export default DashboardPage
