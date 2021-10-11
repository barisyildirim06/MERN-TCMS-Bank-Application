import React from 'react'
import './HomePage.css'
import NavBar from '../NavBar/NavBar'
import {Input} from 'antd'

function HomePage() {
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
                    <p className='watchThisSpaceText'>
                        WATCH THIS SPACE
                    </p>
                    <p className='letUsKnowText'>Let us know if you are interested</p>
                    <div className='subscribeInputContainer'>
                        <Input placeholder='Email Address' type="text" className='subscribeInput' />
                    </div>
                </div>
            </div>
            <div className='whatWeDo'>
                <div className='mobileWhatWeDo'>WHAT WE DO</div>
                <div className='background1' />
                <div className='gridContainer2080'>
                    <div className='gridContainer2080text0'>WHAT WE DO</div>
                    <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
                </div>
                <div className='background2SmallScreens' />
                <div className='whiteFlexContainer'>
                    <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
                </div>
                <div className='background2' />
                <div className='background3' />
                <div className='whiteFlexContainer'>
                    <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
                </div>
            </div>
            <div className='getToKnowUs'>
                <div className='getToKnowUsTextContainer'>
                    <div className='getToKnowUsText'>
                        GET TO KNOW US
                    </div>
                    <div className='advisoryBoardText'>
                        ADVISORY BOARD
                    </div>
                </div>
                <div className='cardsListGrid'>
                    <div className='cardStyle'>
                        <div className='cardImage0'>
                            JOHNATHAN
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>RDYGES</p>
                            <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
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
                    <div className='cardStyle'>
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
                                <p className='cardTextType0'>JOHNATHAN RDYGES</p>
                                <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
                            </div>
                        </div>
                    </div>
                    <div className='mobileCard'>
                        <div className='cardImage1'>                        
                            <div className='cardTextArea'>
                                <p className='cardTextType0'>MIRANDA HOBBES</p>
                                <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
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
                            GINA
                        </div>
                        <div className='cardTextArea'>
                            <p className='cardTextType0'>MANOBAN</p>
                            <p className='cardTextType1'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </p>
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
                    <div className='cardStyle'>
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
                    SIGN UP FOR NEWS AND UPDATE
                </div>
                <br />
                <div className='subscribeInputContainer' style={{ marginLeft:'10vw' }}>
                    <Input placeholder='Email Address' type="text" className='subscribeInput' />
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
