import { Link } from "react-router-dom";
import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaAlignJustify } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive'

import './navbar.css'


import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { useSelector } from "react-redux";

function Navbar(props) {
    const user = useSelector(state => state.user)
    const { hasSideNavIcon } = props;
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    const is400px = useMediaQuery({
        query: '(min-width: 400px)'
    })

    const handleSideNavBarOpen = () => {
        if(is400px){
            document.getElementById("mySidenav").style.width = "400px"
            document.getElementById("marginLeft").style.paddingLeft = "400px"
        }else {
            document.getElementById("mySidenav").style.width = "100%"
        }
    }

    return (
        <section>
            <nav id="navbar">
                <div className='nav-logo'>
                    <div >
                        {hasSideNavIcon ?
                            <button
                                style={{ width: '100%', height: '100%' }}
                                type="button"
                                className="nav-button"
                                onClick={handleSideNavBarOpen}
                            >
                                <FaAlignJustify className="nav-icon"/>
                            </button> :
                            <Link to="/" ><img src="/static/img/logo_tcms.png" alt='' style={{ width: '100%', height: '100%' }}/> </Link>
                        }
                    </div>
                    <div className='nav-header-text'>
                        <p className='nav-text'><span >TREASURY CAPITAL</span><span>MANAGEMENT SERVICES LTD</span></p>
                    </div>
                </div>
                <div className="nav-login">
                    {user.userData && !user.userData.isAuth ? <ul className="nav-sign">
                        <li>
                            <Link to="/" >Home</Link>
                        </li>
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
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            {user.userData.isAdmin &&
                            <li>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                            }
                            <li>
                                <a href = {() => false} onClick={logoutHandler}>Logout</a>
                            </li>
                        </ul>}
                </div>
            </nav>
        </section>


    )
}

export default withRouter(Navbar);
