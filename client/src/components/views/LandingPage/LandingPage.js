import React, {useEffect} from 'react'
import './landing-page.css'
import axios from 'axios'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

function LandingPage(props) {
    console.log(props)

    const handleClick = async () => {
        const generalLedger = {
            transactionNotes: props?.user?.userData?._id,
            transactionType: 'DEBIT',
            transactionDate: '17/10/2021',
            ledgerSource: '',
            amount: -560,
            currency: 'USD',
        }

        await axios.post('http://localhost:3000/api/generals/create', generalLedger)
        .then(response => {
            alert(response)
        })
        .catch((error) => {
            console.log(error);
        });
        // const withdrawalLedger = {
        //     account: props?.user?.userData?._id,
        //     amount: -25,
        //     dateSubmitted: '09/10/2021',
        //     status: 'Pending',
        //     account: 'USD',
        //     dateConfirmed: ''
        // }

        // await axios.post('http://localhost:3000/api/withdrawals/create', withdrawalLedger)
        // .then(response => {
        //     alert(response)
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }
    return (
        <>
        <NavBar />
        <div className='gridContainer5842'>
            <div style={{ backgroundColor: '#4c594e', height: '100vh' }}>
                
            </div>
            <div className='background0'>
                
            </div>
        </div>
        <div className='gridContainer3862'>
            <div className='background1'>
                
            </div>
            <div className='gridContainer2080'>
                <div className='gridContainer2080text0'>WHAT WE DO</div>
                <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
            </div>
        </div>
        <div className='gridContainer6238'>
            <div className='gridContainer6238grid0'>
                <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
            </div>
            <div className='background2'>
                
            </div>
        </div>
        <div className='gridContainer3862'>
            <div className='background3'>
                
            </div>
            <div style={{ backgroundColor: '#b3c2ac', height: '44vh', display: 'flex' }}>
                <div className='gridContainerInnerText0'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </div>
            </div>
        </div>
        <div>
        <button onClick={handleClick}>
            new
        </button>
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
                <div style={{ height: '8vh' }}>
                    
                </div>
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
            <div style={{ height: '9vh' }}>
            </div>
            <div  style={{ backgroundColor: '#afbec6', height: '44vh' }}>
                <div style={{ display: 'grid', gridTemplateRows: '20% 80%' }}>
                    <div style={{ textAlign: 'left', marginLeft: '2vw', fontWeight: '400', fontSize: '4vw', letterSpacing: '1vw', }}>INTERESTED?</div>
                </div>
            </div>
            <div style={{ backgroundColor: '#b3c2ac', height: '33vh' }}>
                <div style={{ display: 'grid', gridTemplateRows: '20% 80%' }}>
                    <div style={{ textAlign: 'left', marginLeft: '2vw', fontWeight: '400', fontSize: '4vw', letterSpacing: '1vw', }}>GOT QUESTIONS?</div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default LandingPage
