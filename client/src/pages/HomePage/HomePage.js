import React, { useState } from 'react'
import './HomePage.css'
import NavBar from 'components/views/NavBar/NavBar'
import { Input } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import Axios from 'axios';

function HomePage() {
    const [subscriberEmail, setSubscriberEmail] = useState("");

    const handleSubscribeEmailChange = (e) => {
        setSubscriberEmail(e.target.value)
    }

    const handleSubscribeClick = () => {
        const data = {
            email: subscriberEmail
        }
        Axios.post('/api/subscribers/create', data).then(res => {
            if (res.data.message) {
                alert(res.data.message)
            }
        })
    }

    return (
        <div>
            <NavBar />
            <div className='backgroundimage0' />
            <div className='gradientColor0'/>
            <div className='gradientColor1'/>
            <div className='backgroundimage1' />
            <div className='headerTextContainer'>
                <p className='headerLeftText'>YOUR GUIDE THROUGH &nbsp;</p><p className='headerRightText'>THE FINANCIAL WORLD</p>
            </div>
            <div className='watchThisSpaceContainer'>
                <div />
                <div className='flexColumn'>
                    <p className='letUsKnowText'>Let us know if you are interested</p>
                    <div className='subscribeInputContainer'>
                        <Input value={subscriberEmail} onChange={handleSubscribeEmailChange} placeholder='Email Address' type="text" suffix={<ArrowRightOutlined onClick={handleSubscribeClick} />} className='subscribeInput' />
                    </div>
                </div>
            </div>
            <div className='whatWeDo'>
                <div className='mobileWhatWeDo'>WHAT WE DO</div>
                <div className='background1' />
                <div className='whiteFlexContainer'>
                    <div className='gridContainer2080text0'>WHAT WE DO</div>
                    <div className='gridContainerInnerText0' style={{ marginLeft: '20px', textAlign: 'left' }}>We protect our clients most precious capital from inflation</div>
                    <br /><br /><br />
                    <ul className='gridContainerInnerText0' style={{ marginLeft: '20px', textAlign: 'left' }}>
                        <li ><p style={{ display:'flex', alignItems: 'center' }}>Earn&nbsp;<h1>6-10%</h1>&nbsp;per annum</p></li>
                        <li ><p style={{ display:'flex', alignItems: 'center' }}>Withdraw anytime, &nbsp;<h2 style={{ marginBottom: '12px' }}>two working days</h2></p></li>
                        <li >Use our online platform, or call for support</li>
                    </ul>
                </div>
                <div className='background2SmallScreens' />
                <div className='whiteFlexContainer' style={{ marginLeft: '20px', textAlign: 'left' }}>
                    <h1>Low Risk</h1>
                    <div className='gridContainerInnerText0'>We eliminate most forms of risk through our investing style</div>
                    <br /><br /><br />
                    <ul className='gridContainerInnerText0'>
                        <li >No market or asset price risk, we are fully hedged</li>
                        <br />
                        <li >No currency risk, investing in a range of currencies</li>
                        <br />
                        <li >No credit risk, we do not invest in bonds or other debt instruments</li>
                    </ul>
                </div>
                <div className='background2' />
                <div className='background3' />
                <div className='whiteFlexContainer' style={{ marginLeft: '20px', textAlign: 'left' }}>
                    <h1>Why use us?</h1>
                    <br /><br /><br />
                    <ul className='gridContainerInnerText0'>
                        <li >New Zealand domiciled and regulated wholesale offer</li>
                        <br />
                        <li >New Zealand trust holds your capital on your behalf</li>
                        <br />
                        <li >Standard, tax efficient, PIE fund structure</li>
                        <br />
                        <li >Specialists in this specific investment</li>
                    </ul>
                </div>
            </div>
            <div className='getToKnowUs'>
                <div className='getToKnowUsTextContainer'>
                    <div className='getToKnowUsText'>
                        GET TO KNOW US
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'start', marginLeft: '5vw', fontFamily:'sans-serif', fontStyle: 'normal', fontWeight: '400', fontSize: '2vw', lineHeight: '2vh', letterSpacing: '0.5vw', color: '#000005' }}>
                        ADVISORY BOARD
                    </div>
                </div>
                <div className='cardsListGrid'>
                    <div className='cardStyle'>
                        <div className='cardImage0'>
                            DAVE
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>JOHNSTON</p>
                            <p className='cardTextType0'>Advisory</p>
                            <p className='cardTextType1'>Dave is a partner at global law firm DLA Piper. He has substantial experience in tax law, associated with funds management.</p>
                        </div>
                    </div>
                    <div className='cardStyle'>
                        <div className='cardImage1'>
                            MIRANDA
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>HOBBES</p>
                            <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                        </div>
                    </div>
                    <div className='thirdItem cardStyle'>
                        <div className='cardImage2'>JAMES
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>BUNNINGHAM</p>
                            <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                        </div>
                    </div>
                    <div className='mobileCard'>
                        <div className='cardImage0'>
                            <div className='cardTextArea'>
                                <p className='cardTextType0'>JOHNATHAN JOHNSTON</p>
                                <p className='cardTextType1'>Dave is a partner at global law firm DLA Piper. He has substantial experience in tax law, associated with funds management. </p>
                            </div>
                        </div>
                    </div>
                    <div className='mobileCard'>
                        <div className='cardImage3'>                        
                            <div className='cardTextArea'>
                                <p className='cardTextType0'>MATT GRAHAM</p>
                                <p className='cardTextType0'>Managing Director</p>
                                <p className='cardTextType1'>Matt Graham comes from a corporate finance, M&A and strategy background. Having spent time in various corporate finance and strategy teams in Fonterra, Steel & Tube and Woolworths. </p>
                            </div>
                        </div>
                    </div>
                    <div className='mobileCard'>
                        <div className='cardImage2'>
                            <div className='cardTextArea'>
                                <p className='cardTextType0'>JAMES BUNNINGHAM</p>
                                <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='executiveTeamText'>
                    <div style={{ height: '8vh' }} />
                    <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'start', marginLeft: '5vw', fontFamily:'sans-serif', fontStyle: 'normal', fontWeight: '400', fontSize: '2vw', lineHeight: '2vh', letterSpacing: '0.5vw', color: '#000005' }}>
                        EXECUTIVE TEAM
                    </div>
                </div>
                <div className='cardsListGrid'>
                    <div className='cardStyle'>
                        <div className='cardImage3'>
                            MATT
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>GRAHAM</p>
                            <p className='cardTextType0'>Managing Director</p>
                            <p className='cardTextType1'>Matt Graham comes from a corporate finance, M&A and strategy background. Having spent time in various corporate finance and strategy teams in Fonterra, Steel & Tube and Woolworths. </p>
                        </div>
                    </div>
                    <div className='cardStyle'>
                        <div className='cardImage4'>KEVIN
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>NGUYEN</p>
                            <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                        </div>
                    </div>
                    <div className='thirdItem cardStyle'>
                        <div className='cardImage5'>NATHAN
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>RYDER</p>
                            <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                        </div>
                    </div>
                </div>
                <div className='getToKnowUsFooter' />
            </div>
            <div className='interestedContainer'>
                <div className='interestedText'>
                    INTERESTED?
                </div>
                <br /><br />
                <div className='signUpText'>
                    SIGN UP FOR NEWS AND UPDATES
                </div>
                <br />
                <div className='subscribeInputContainer' style={{ marginLeft:'10vw' }}>
                    <Input value={subscriberEmail} onChange={handleSubscribeEmailChange} placeholder='Email Address' type="text" suffix={<ArrowRightOutlined onClick={handleSubscribeClick} />} className='subscribeInput' />
                </div>
            </div>
            <div style={{ position:'absolute', top:'413vh' , height: '33vh' }}>
                <div className='gotQuestionsContainer'>
                    <div className='gotQuestions'>GOT QUESTIONS?</div>
                    <div />
                    <div/>
                    <div className='contactUs'>
                        <p><span className='contactUsText'>CONTACT US</span><span className='tcmsMailText'>tcms.ltd@gmail.com</span></p>
                    </div>
                </div>
            </div>
            <div className='homePageFooterImage' />
            <div className='homePageFooterContainer'>
                <div >
                    <img src="/static/img/logo_tcms.png" alt='' className='footerIcon'/>
                </div>
                <div className='footerMargin'>
                    <p><span className='homePageFooterText'>TREASURY CAPITAL</span ><span className='homePageFooterText'>MANAGEMENT SERVICES LTD</span></p>
                </div>
            </div>
            <div className='homePageFooterBackgroundColor'/>
        </div>
    )
}

export default HomePage
