import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import DashboardPage from './views/DashboardPage/dashboardPage';
import 'antd/dist/antd.css';
import './app.css'
import general from '../hoc/general';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div>
                <Switch>
                    <Route exact path="/" component={Auth(general(LandingPage, null))} />
                    <Route exact path="/dashboard" component={Auth(general(DashboardPage, null))} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
