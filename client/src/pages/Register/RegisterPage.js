import React, { useState } from 'react'
import NavBar from 'components/views/NavBar/NavBar'
import { Input, Select } from 'antd';
import './RegisterPage.css'
import { registerUser } from "_actions/user_actions";
import { useDispatch } from "react-redux";
import ConfirmDialog from 'dialogs/confirm-dialog/confirm-dialog-visible';

const { Option } = Select;
function Register(props) {
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const refCode = query.get('refCode')
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        idimage: '',
        type: 'individual',
        companyName: ''
    });

    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const handleChange = (e, param) => {
        let _values = { ...values }
        if (param === 'name') {
            _values = { ..._values, name: e.target.value }
            setValues(_values)
        }
        else if (param === 'lastname') {
            _values = { ..._values, lastname: e.target.value }
            setValues(_values)
        }
        else if (param === 'email') {
            _values = { ..._values, email: e.target.value }
            setValues(_values)
        }
        else if (param === 'phone') {
            _values = { ..._values, phone: e.target.value }
            setValues(_values)
        }
        else if (param === 'password') {
            _values = { ..._values, password: e.target.value }
            setValues(_values)
        }
        else if (param === 'confirmPassword') {
            _values = { ..._values, confirmPassword: e.target.value }
            setValues(_values)
        }
        else if (param === 'type') {
            if (e === 'individual')  _values = { ..._values, type: e, companyName: '' }
            else if (e === 'companyName')  _values = { ..._values, type: e }
            setValues(_values)
        }
        else if (param === 'companyName') {
            _values = { ..._values, companyName: e.target.value }
            setValues(_values)
        }
    };
    const validate = () => {
        if (values.name === "" || !values.name.trim()) {
            alert("Please enter a name.");
            return false;
        }
        if (values.lastname === "" || !values.lastname.trim()) {
            alert("Please enter a last name.");
            return false;
        }
        if (values.email === "" || !values.email.trim()) {
            alert("Please enter a contact email.");
            return false;
        }
        if (values.phone === "" || !values?.phone?.trim()) {
            alert("Please enter a contact number.");
            return false;
        }
        if (values.password === "" || !values.password.trim()) {
            alert("Please enter a password.");
            return false;
        }
        if (values.confirmPassword === "" || !values.confirmPassword.trim()) {
            alert("Please enter a confirm password.");
            return false;
        }
        if (values.password.length < 6) {
            alert("Your password should be at least 6 digits.");
            return false;
        }
        if (values.confirmPassword !== values.password) {
            alert("Your password and confirm password should be same");
            return false;
        }
        return true
    }
    const handleSave = () => {
        if (!validate()) return;
        let _values = { ...values, userID: Math.floor(100000000 + Math.random() * 900000000) };
        if (refCode) _values = { ..._values, refCode }
        dispatch(registerUser(_values)).then(response => {
            if (response.payload.success) {
                props.history.push("/login");
            } else {
                alert(response.payload.err.errmsg)
            }
        })
    }

    const handleNextClick = () => {
        if (!validate()) return;
        setConfirmDialogVisible(true);
    }

    const handleConfirmDialogClose = () => {
        setConfirmDialogVisible(false);
    }

    return (
        <div className='registerContainer'>
            <NavBar />
            <div className='registerBottom'>
                <div className='registerBottomGrid0'>
                    <p>
                        <span style={{ fontSize: '37px', lineHeight: '42px' }}>
                            CREATE YOUR ACCOUNT INFORMATION
                        </span>
                        <span style={{ color: '#c9cad2', display: 'flex' }}>
                            Already have an account? <span> </span><a href='/login' style={{ marginLeft: '6px', color: '#c9cad2', textDecoration: 'underline' }}>Sign In</a>
                        </span>
                    </p>
                </div>
                <div className='registerBottomGrid1'>
                    <div className='registerInputContainer'>
                        <label>First Name</label>
                        <Input value={values.name} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'name')} />
                    </div>
                    <div className='registerInputContainer'>
                        <label>Last Name</label>
                        <Input value={values.lastname} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'lastname')} />
                    </div>
                    <div className='registerInputContainer'>
                        <label>Contact Email</label>
                        <Input value={values.email} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'email')} />
                    </div>
                    <div className='registerInputContainer'>
                        <label>Contact Number</label>
                        <Input value={values.phone} type='number' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'phone')} />
                    </div>
                    <div className='registerInputContainer'>
                        <label>Type</label>
                        <Select defaultValue={'individual'} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(value) => handleChange(value,'type')}>
                            <Option key='individual'>Individual</Option>
                            <Option key='companyName'>Company</Option>
                        </Select>
                    </div>
                    {
                        values.type === 'companyName' ? 
                        <div className='registerInputContainer'>
                            <label>Company Name</label>
                            <Input value={values.companyName} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'companyName')} />
                        </div> : 
                        <div/>
                    }
                    <div className='registerInputContainer'>
                        <label>Password</label>
                        <Input value={values.password} type='password' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'password')} />
                    </div>
                    <div className='registerInputContainer'>
                        <label>Confirm Password</label>
                        <Input value={values.confirmPassword} type='password' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px' }} onChange={(e) => handleChange(e, 'confirmPassword')} />
                    </div>
                </div>
                <button className='nextButton' onClick={handleNextClick}>NEXT</button>
            </div>
            <ConfirmDialog 
                visible={confirmDialogVisible}
                onClose={handleConfirmDialogClose}
                onConfirm={handleSave}
                setValues={setValues}
                values={values}
            />
        </div>
    )
}

export default Register
