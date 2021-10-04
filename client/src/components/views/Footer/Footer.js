import React from 'react'

function Footer() {
    return (
        <div style={{ backgroundColor: '#4c594e', height: '48vh', display: 'flex', alignItems: 'center'}}>
            <div ><img src="/static/img/logo_tcms.png" style={{ width: '20vh', height: '20vh', marginLeft: '20vw' }}/></div>
            <div style={{ marginLeft: '20vw', marginRight: '20vw' }}><p style={{ color:'grey', fontFamily:'sans-serif', fontStyle: 'normal', fontWeight: '400', fontSize: '1vw', letterSpacing: '0.1vw', textAlign: 'left' }}><span>TREASURY CAPITAL</span>MANAGEMENT SERVICES LTD<span></span></p></div>
        </div>
    )
}

export default Footer
