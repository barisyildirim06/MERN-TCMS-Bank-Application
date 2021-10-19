import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { useDispatch } from "react-redux";
import NavBar from "components/views/NavBar/NavBar";
import './ResetPasswordPage.css'


const { Title } = Typography;

function ResetPasswordPage(props) {
    const dispatch = useDispatch();
    const handleChange = (e, param) => {
        let _values = { ...values }
        if (param === 'email') {
            _values = {...values, email: e.target.value}
        }
        else if (param === 'previousPassword') {
            _values = {...values, previousPassword: e.target.value}
        }
        else if (param === 'newPassword') {
            _values = {...values, newPassword: e.target.value}
        }
        else if (param === 'confirmPassword') {
            _values = {...values, confirmPassword: e.target.value}
        }
        setValues(_values)
    };
    const validate = () => {
        if (values.email === "" || !values.email.trim()) {
            alert("Please enter a contact email.");
            return false;
        }
        if (values.previousPassword === "" || !values.previousPassword.trim()) {
            alert("Please enter your previous password.");
            return false;
        }
        if (values.newPassword === "" || !values.newPassword.trim()) {
            alert("Please enter your new password.");
            return false;
        }
        if (values.confirmPassword === "" || !values.confirmPassword.trim()) {
            alert("Please enter a confirm password.");
            return false;
        }
        if (values.previousPassword.length <6) {
            alert("Your previous password should be at least 6 digits.");
            return false;
        }
        if (values.newPassword.length <6) {
            alert("Your new password should be at least 6 digits.");
            return false;
        }
        if (values.confirmPassword.length <6) {
            alert("Your confirmation password should be at least 6 digits.");
            return false;
        }
        if (values.confirmPassword !== values.newPassword) {
            alert("Your new password and confirm password should be same");
            return false;
        }
        return true
    }
    const [values, setValues] = useState({
        email: '',
        previousPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const handleSave = () => {
        if(!validate()) return;
        // dispatch(registerUser(values)).then(response => {
        //     if (response.payload.success) {
        //       props.history.push("/login");
        //     } else {
        //       alert(response.payload.err.errmsg)
        //     }
        // })
    }
    return (
        <div className='resetContainer'>
        <NavBar />
        <div className='resetBottom'>
            <span className='flex-center' style={{ fontSize: '37px', lineHeight: '42px' }}>
                RESET YOUR PASSWORD
            </span>
            <div className='flex-center' style={{ flexDirection: 'column' }}>
                <div className='resetInputContainer'>
                    <label>Contact Email</label>
                    <Input value={values.email} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'email')}/>
                </div>
                <div className='resetInputContainer'>
                    <label>Previous Password</label>
                    <Input value={values.previousPassword} type='password' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'previousPassword')}/>
                </div>
                <div className='resetInputContainer'>
                    <label>New Password</label>
                    <Input value={values.newPassword} type='password' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'newPassword')}/>
                </div>
                <div className='resetInputContainer'>
                    <label>Confirm Password</label>
                    <Input value={values.confirmPassword} type='password' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'confirmPassword')}/>
                </div>
            </div>
            <div className='flex-center' style={{ alignItems: 'baseline' }}>
                <button className='nextButton' onClick={handleSave}>NEXT</button>
            </div>
        </div>
    </div>
    );
};

export default withRouter(ResetPasswordPage);


