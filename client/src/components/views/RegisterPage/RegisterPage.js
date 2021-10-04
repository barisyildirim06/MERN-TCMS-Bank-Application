import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastname: '',
        name: '',
        companyName: '',
        irdNumber: '',
        companyOfficeNumber: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        companyName: Yup.string()
        .required('Company Name is required'),
        irdNumber: Yup.string()
          .required('IRD Number is required'),
        companyOfficeNumber: Yup.string()
          .required("Company's Office Number is required"),
        name: Yup.string()
          .required('Name is required'),
        lastname: Yup.string()
          .required('Last Name is required'),
        phone: Yup.string()
          .required('Phone is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            companyName: values.companyName,
            phone: values.phone,
            irdNumber: values.irdNumber,
            companyOfficeNumber: values.companyOfficeNumber,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app" >
            <h2 style={{ marginTop: '100px' }}>Sign up</h2>
            <Form style={{ minWidth: '400px' }} {...formItemLayout} onSubmit={handleSubmit} >
              <Form.Item required label="Company Name">
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  type="text"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.companyName && touched.companyName ? 'text-input error' : 'text-input'
                  }
                />
                {errors.companyName && touched.companyName && (
                  <div className="input-feedback">{errors.companyName}</div>
                )}
              </Form.Item>
              <Form.Item required label="IRD Number">
                <Input
                  id="irdNumber"
                  placeholder="Enter your IRD number"
                  type="text"
                  value={values.irdNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.irdNumber && touched.irdNumber ? 'text-input error' : 'text-input'
                  }
                />
                {errors.irdNumber && touched.irdNumber && (
                  <div className="input-feedback">{errors.irdNumber}</div>
                )}
              </Form.Item>
              <Form.Item required label="Office Number">
                <Input
                  id="companyOfficeNumber"
                  placeholder="Enter your Company's Office Number"
                  type="text"
                  value={values.companyOfficeNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.companyOfficeNumber && touched.companyOfficeNumber ? 'text-input error' : 'text-input'
                  }
                />
                {errors.companyOfficeNumber && touched.companyOfficeNumber && (
                  <div className="input-feedback">{errors.companyOfficeNumber}</div>
                )}
              </Form.Item>
              <Form.Item required label="First Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>
              <Form.Item required label="Last Name">
                <Input
                  id="lastname"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastname && touched.lastname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lastname && touched.lastname && (
                  <div className="input-feedback">{errors.lastname}</div>
                )}
              </Form.Item>
              <Form.Item required label="Contact Phone" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="phone"
                  placeholder="Enter your Contact Phone"
                  type="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone && touched.phone ? 'text-input error' : 'text-input'
                  }
                />
                {errors.phone && touched.phone && (
                  <div className="input-feedback">{errors.phone}</div>
                )}
              </Form.Item>
              <Form.Item required label="Contact Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Contact Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>
              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>
              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
