import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Upload, Input } from 'antd';
import './VerifyPage.css'
import Axios from 'axios';

function VerifyPage(props) {
    console.log(props.user.userData)
    const [fileList, setFileList] = useState([]);
    const [values, setValues] = useState({
        companyName: '',
        irdNumber: '',
        companyOfficeNumber: '',
        agentFirstName: '',
        agentLastName: '',
        agentJobTitle: '',
        image: ''
    });

    const handleChange = (e, param) => {
        if (param === 'companyName') {
            setValues({...values, companyName: e.target.value})
        }
        else if (param === 'irdNumber') {
            setValues({...values, irdNumber: e.target.value})
        }
        else if (param === 'companyOfficeNumber') {
            setValues({...values, companyOfficeNumber: e.target.value})
        }
        else if (param === 'agentFirstName') {
            setValues({...values, agentFirstName: e.target.value})
        }
        else if (param === 'agentLastName') {
            setValues({...values, agentLastName: e.target.value})
        }
        else if (param === 'agentJobTitle') {
            setValues({...values, agentJobTitle: e.target.value})
        }
    };

    const validate = () => {
        if (values.companyName === "" || !values.companyName.trim()) {
            alert("Please enter a Company Name.");
            return false;
        }
        if (!values.irdNumber) {
            alert("Please enter an IRD Number.");
            return false;
        }
        if (!values.companyOfficeNumber) {
            alert("Please enter a Company Office Number.");
            return false;
        }
        if (values.agentFirstName === "" || !values?.agentFirstName?.trim()) {
            alert("Please enter an Agent First Name.");
            return false;
        }
        if (values.agentLastName === "" || !values.agentLastName.trim()) {
            alert("Please enter an Agent Last Name.");
            return false;
        }
        if (values.agentJobTitle === "" || !values.agentJobTitle.trim()) {
            alert("Please enter an Agent Job Title.");
            return false;
        }
        return true
    }

    const handleSave = () => {
        if(!validate()) return;
        Axios.post(`/api/users/update/${props.user.userData._id}`, {...props?.user?.userData, ...values})
    }

    const test = {
        name: 'file',
        action: '/api/users/uploadImage',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
            setFileList(info.fileList.slice(-1))
            setValues(prevState => prevState = {...prevState, image: info?.fileList[0]?.response? info.fileList[0].response.fileName : ''})
        },
    };
    useEffect(() => {
        if (props?.user?.userData) {
            setValues(props?.user?.userData)
        }
    }, [props?.user?.userData])
    console.log(props?.user?.userData?.image)
    return (
        <div className='verifyContainer'>
            <NavBar />
            <div className='verifyBottom'>
                <div className='verifyBottomGrid0'>
                    <p style={{ fontSize: '37px', lineHeight: '42px' }}>
                        VERIFY YOUR ACCOUNT
                    </p>
                </div>
                <div className='verifyBottomGrid1'>
                    <div className='verifyInputGridContainer'>
                        <div className='verifyInputContainer'>
                            <label>Company Name</label>
                            <Input value={values.companyName} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'companyName')}/>
                        </div>
                        <div className='verifyInputContainer'>
                            <label>IRD Number</label>
                            <Input type='number' value={values.irdNumber} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'irdNumber')}/>
                        </div>
                    </div>
                    <div className='verifyInputGridContainer'>
                        <div className='verifyInputContainer'>
                            <label>Company Office's Number</label>
                            <Input type='number' value={values.companyOfficeNumber} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'companyOfficeNumber')}/>
                        </div>
                        <div className='verifyInputContainer'>
                            <label>Agent First Name</label>
                            <Input value={values.agentFirstName} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'agentFirstName')}/>
                        </div>
                    </div>
                    <div className='verifyInputGridContainer'>
                        <div className='registerInputContainer'>
                            <label>Agent Last Name</label>
                            <Input value={values.agentLastName} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'agentLastName')}/>
                        </div>
                        <div className='registerInputContainer'>
                            <label>Agent Job Title</label>
                            <Input value={values.agentJobTitle} style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} onChange={(e) => handleChange(e,'agentJobTitle')}/>
                        </div>
                    </div>
                    <div className='verifyInputGridContainer'>
                            <div className='registerInputContainer'>
                                <label>Upload Your ID</label>
                                <Upload {...test} fileList={fileList} showUploadList={{ showRemoveIcon : false}}>
                                    <div style={{ display: 'flex' }}>
                                        <Input placeholder='PDF, JPEG, PNG' style={{ height: '7vh', marginTop: '1vh', fontSize: '20px'}} disabled={true}/>
                                        <button className='nextButton' style={{ height: '7vh', marginTop: '1vh' }}>UPLOAD</button>
                                    </div>
                                </Upload>
                        </div>
                    </div>
                </div>
                <button className='nextButton' onClick={handleSave}>Submit</button>
            </div>
        </div>
    )
}

export default VerifyPage
