import React from 'react';
import { Link } from "react-router-dom";

function SideNavBar() {

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0px"
        document.getElementById("navbar").style.paddingLeft = "0px"
        document.getElementById("marginLeft").style.paddingLeft = "0px"

    }


    return (
        <div></div>
    )
}


export default SideNavBar;
