import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "hoc/auth";
import general from 'hoc/general';
// pages for this product
import LoginPage from "pages/LoginPage/LoginPage.js";
import RegisterPage from 'pages/Register/RegisterPage';
import DashboardPage from 'pages/DashboardPage/dashboardPage';
import HomePage from 'pages/HomePage/HomePage';
import 'antd/dist/antd.css';
import './app.css'
import VerifyPage from 'pages/VerifyPage/VerifyPage';
import SideNavBar from './views/SideNavBar/SideNavBar';
import AdminDashboardPage from 'pages/AdminDashboardPage/AdminDashboardPage';
import ResetPasswordPage from 'pages/ResetPasswordPage/ResetPasswordPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div id="marginLeft">
                <SideNavBar />
                <Switch>
                    <Route exact path="/" component={Auth(HomePage, null)} />
                    <Route exact path="/dashboard" component={Auth(general(DashboardPage),true)} />
                    <Route exact path="/admin/dashboard" component={Auth(general(AdminDashboardPage),true,true)} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/reset-password" component={Auth(ResetPasswordPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/verify" component={Auth(VerifyPage, true)} />
                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
