import React from 'react'
import './HomePage.css'
import NavBar from '../NavBar/NavBar'

function HomePage() {
    return (
        <div>
            <NavBar />
            <div className='backgroundimage0' />
            <div className='gradientColor0'/>
            <div className='gradientColor1'/>
            <div className='backgroundimage1' />
            <div className='whatWeDo'>
                <div className='background1'>
                
                </div>
                <div className='gridContainer2080'>
                    <div className='gridContainer2080text0'>WHAT WE DO</div>
                    <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
                </div>
                <div className='whiteFlexContainer'>
                    <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
                </div>
                <div className='background2'>
                    
                </div>
                <div className='background3'>
                
                </div>
                <div className='whiteFlexContainer'>
                    <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
                </div>
            </div>
            <div className='getToKnowUs'>
                <div style={{ height: '12vh' }}>
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
                </div>
                <div style={{ height: '12vh' }}>
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
                <div style={{ height: '8vh' }} />
            </div>
            <div style={{ position:'absolute', top:'413vh' , height: '33vh' }}>
                <div style={{ display: 'grid', gridTemplateRows: '40% 60%', gridTemplateColumns: '50% 50%', height: '100%', width:'100%' }}>
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
                    <img src="/static/img/logo_tcms.png" style={{ width: '20vh', height: '20vh', marginLeft: '20vw', zIndex: '1' }}/>
                </div>
                <div style={{ marginLeft: '20vw', marginRight: '20vw' }}>
                    <p><span className='homePageFooterText'>TREASURY CAPITAL</span ><span className='homePageFooterText'>MANAGEMENT SERVICES LTD</span></p>
                </div>
            </div>
            <div className='homePageFooterBackgroundColor'/>
        </div>
    )
}

export default HomePage
