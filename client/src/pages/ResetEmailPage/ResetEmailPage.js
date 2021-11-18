import React, { useState } from "react";
import { passwordEmail } from "_actions/user_actions";
import { Input } from 'antd';
import { useDispatch } from "react-redux";
import NavBar from "components/views/NavBar/NavBar";
import './ResetEmailPage.css'

function ResetEmailPage(props) {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: ''
    });
    const handleChange = (e, param) => {
        let _values = { ...values }
        if (param === 'email') {
            _values = {...values, email: e.target.value}
        }
        setValues(_values)
    };
    const validate = () => {
        if (values.email === "" || !values.email.trim()) {
            alert("Please enter a contact email.");
            return false;
        }
        return true
    }
    const handleSave = () => {
        if(!validate()) return;
        dispatch(passwordEmail(values)).then(response => {
            if (response.payload.success) {
                alert('Your password reset link is sent to your email!')
                props.history.push("/login");
            } else {
                alert(response.payload.message)
            }
        })
    }
    return (
        <div className='resetContainer'>
        <NavBar />
        <div>
            <span className='flex-center' style={{ fontSize: '37px', lineHeight: '42px', marginTop: '25vh' }}>
                SEND MAIL TO YOUR CONTACT EMAIL
            </span>
            <br />
            <div className='flex-center' style={{ flexDirection: 'column' }}>
                <div className='resetInputContainer'>
                    <label>Contact Email</label>
                    <Input value={values.email} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'email')}/>
                </div>
            </div>
            <div className='flex-center' style={{ alignItems: 'baseline' }}>
                <button className='nextButton' onClick={handleSave}>SEND</button>
            </div>
        </div>
    </div>
    );
};

export default ResetEmailPage;


