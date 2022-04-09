// import useState hook to create a rememberMe state which is used to save the client details in the localStorage
import React, { useState } from 'react';

// import useNavigate to redirect user to a specific Url
import { useNavigate } from 'react-router-dom';

// import Form from react-bootstrap to create a login form
import { Form } from 'react-bootstrap';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import useFormik hook that will return all formik state and helpers directly
import { useFormik } from 'formik';

// import Yup API for formik validation schema
import * as Yup from 'yup';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux'

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// if the login was failed and storeUserDetails to save the id, clientType and expiration date if login was successful
import { storeUserDetails, setMessage } from '../../store/actions/ReducerActions';

// import Api - axios HTTP communication handler and login service class
import Api from '../api/Api';

// import LoginService Class
import LoginService from '../service/LoginService';

// import a user logo
import logo from '../../assets/img/logos/login_logo.jpg';

// import our custom css 
import '../../styles/Login.css';

const Login = () => {

    // useDispatch hook dispatches our actions from the redux store without connecting our component with connect method
    const dispatch = useDispatch();

    // useNavigate hook redirects user to a appropriate client menu Url
    const navigate = useNavigate();

    // useState hook to handle remember me button
    const [rememberMe, setRememberMe] = useState(false);

    // create initial validation schema using Yup Api that receives form data values and validates each property 
    // based on the rules defined
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Enter an email address')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Enter a password')
            .min(5, 'Password must be at least 5 characters')
            .max(10, 'Password must not exceed 10 characters'),
        clientType: Yup.string()
            .required('Select a client type')
    });

    // in case of remember me, getItm method gets the email, password and client type values from localStorage 
    // if the values are not null to initialize the form with the saved values
    const emailAddress = localStorage.getItem('email') !== null
        ? localStorage.getItem('email')
        : '';

    const password = localStorage.getItem('password') !== null
        ? localStorage.getItem('password')
        : '';

    const clientType = localStorage.getItem('clientType') !== null
        ? localStorage.getItem('clientType')
        : '';

    // formik uses useFormik hook to initialize the values
    const formik = useFormik({
        initialValues: {
            email: emailAddress,
            password: password,
            clientType: clientType
        },
        // all field-level validations are run at the beginning of a submission attempt and then 
        // the results are deeply merged with any top-level validation results
        validationSchema,

        onSubmit: (data) => {
            // JSON.stringify converts a js value to a json object string (value, replacer, space): 
            // value: the user input will convert to a JSON string, 
            // replacer: if the replacer is null all properties of the object are included in the resulting JSON string, 
            // space: inserts 2 white space into the output JSON string for readability purposes
            console.log(JSON.stringify(data, null, 2));
        },
    });

    // reset handler which resets the form values
    const handleReset = () => {
        formik.setValues({ email: '', password: '', clientType: '' });
    };

    // drop down change handler which sets the client type value accordingly
    const handleDropDownChange = (event) => {
        formik.setFieldValue('clientType', event.target.value);
    };

    // remember me handler returns boolean value
    const handleRememberMe = (event) => {
        if (rememberMe === true) {
            setRememberMe(false);
        } else {
            setRememberMe(true);
        };
    };

    // create a custom function that will send the login details, save them in the storage if handleRememberMe() is true, 
    // receive token from the server if the details are valid and redirect the user to the matched client type menu
    const submitForm = async (event) => {

        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();

        // getting user input values into variables
        let email = formik.values.email;
        let password = formik.values.password;
        let clientType = formik.values.clientType;

        // attempt to login by login service and save the response in variables
        const { isLogin, id, expiration } = await new LoginService().login(email, password, clientType);

        if (isLogin) {

            // if login succeeded stores user details as global states and the expiration date in localStorage
            dispatch(storeUserDetails(id, clientType, expiration));

            // if remember me is true store email, password and clientType in localStorage
            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                localStorage.setItem('clientType', clientType);
            }
            
            // update the authorization header with the jwtToken which received from the server
            Api.updateAuthorizationHeader();

            // using switch case to redirect the user to the matching client type menu
            switch (clientType) {
                case 'admin':
                    navigate('/coupons/admin');
                    break;
                case 'company':
                    navigate('/coupons/company');
                    break;
                case 'customer':
                    navigate('/coupons/customer');
                    break;
                default:
                    navigate('/');
                    break;
            };
        } else {
            dispatch(setMessage('Failed to login: make sure you have selected the right clientType and entered correct email and password'));
        };
    };

    return (
        <div className='login'>
            <Form
                className='login-form'
                onSubmit={submitForm}
            >
                <div className='user_logo'>
                    <img
                        src={logo}
                        alt='user logo'
                    />
                </div>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={formik.values.email}
                        onChange={(e) => formik.handleChange(e)}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <div className='text-danger'>
                        {formik.errors.email
                            ?
                            formik.errors.email
                            :
                            null
                        }
                    </div>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formik.values.password}
                        onChange={formik.handleChange} />
                    <div className='text-danger'>
                        {formik.errors.password
                            ?
                            formik.errors.password
                            :
                            null
                        }
                    </div>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Client type
                    </Form.Label>
                    < Form.Select
                        aria-label='Floating label select example'
                        onChange={handleDropDownChange}
                        value={formik.values.clientType}
                    >
                        <option>
                            Select a client type
                        </option>
                        <option value='admin'>
                            Admin
                        </option>
                        <option value='company'>
                            Company
                        </option>
                        <option value='customer'>
                            Customer
                        </option>
                    </Form.Select>
                    <div className='text-danger'>
                        {formik.errors.clientType
                            ?
                            formik.errors.clientType
                            :
                            null
                        }
                    </div>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Check
                        type='checkbox'
                        label='Remember Me'
                        checked={rememberMe}
                        onChange={handleRememberMe}
                    />
                </Form.Group>
                <MDBBtn
                    className='login_btn'
                    type='submit'
                    disabled={(
                        formik.values.email === ''
                        || !formik.isValid
                        || formik.values.password === ''
                        || formik.values.clientType === ''
                        || formik.values.clientType === 'Select a client type'
                    )}
                    color='primary'
                    noRipple='false'
                    size='sm'
                    floating='true'
                    onClick={submitForm}
                >
                    Login
                </MDBBtn>
                <MDBBtn
                    className='text-light reset-btn'
                    type='reset'
                    color='warning'
                    noRipple='false'
                    size='sm'
                    floating='true'
                    onClick={handleReset}
                >
                    Reset
                </MDBBtn>
            </Form >
        </div>
    );
};

export default Login;
