import { Link } from "react-router-dom";
import React from 'react';
import { withRouter } from 'react-router-dom';

import './navbar.css'


import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { useSelector } from "react-redux";

function Navbar(props) {
    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };


    return (
        <section>
            <nav id="navbar">
                <div className='nav-logo'>
                    <div ><img src="/static/img/logo_tcms.png" style={{ width: '100%', height: '100%' }}/></div>
                    <div style={{ display:'flex', alignItems: 'center' }}>
                        <p className='nav-text'><span >TREASURY CAPITAL</span><span>MANAGEMENT SERVICES LTD</span></p>
                    </div>
                </div>
                <div className="nav-login">
                    {user.userData && !user.userData.isAuth ? <ul className="nav-sign">
                        <li>
                            <Link to="/login" >Signin</Link>
                        </li>
                        <li>
                            <Link to="/register">Signup</Link>
                        </li>
                    </ul>
                        :
                        <ul className="nav-sign ">
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <a onClick={logoutHandler}>Logout</a>
                            </li>
                        </ul>}
                </div>
            </nav>
        </section>


    )
}

export default withRouter(Navbar);
