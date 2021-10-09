import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import Register from './views/Register/register';
import DashboardPage from './views/DashboardPage/dashboardPage';
import HomePage from './views/HomePage/HomePage';
import 'antd/dist/antd.css';
import './app.css'
import general from '../hoc/general';
import VerifyPage from './views/VerifyPage/VerifyPage';
import SideNavBar from './views/SideNavBar/SideNavBar';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div id="marginLeft">
                <SideNavBar />
                <Switch>
                    <Route exact path="/" component={Auth(general(HomePage), null)} />
                    <Route exact path="/dashboard" component={Auth(general(DashboardPage),true)} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(Register, false)} />
                    <Route exact path="/verify" component={Auth(VerifyPage, true)} />
                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
