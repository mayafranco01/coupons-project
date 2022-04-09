// import useState hook to create a company state that will send to its parent Component with data from the form
// and an array of error objects that are displayed to the user if values are empty or invalid

// import useEffect hook, that runs in the first time the render is committed to the screen and on any time 
// the defaultCompany value changes and is used for getting the company's data for editing in case of an update company request
import React, { useState, useEffect } from 'react';

// import Form from react-bootstrap to create a company add/ update form
import { Form } from 'react-bootstrap';

// import Company Class from model
import Company from '../../model/core.company';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import our custom css 
import '../../../styles/Form.css';

// this Component receives a defaultCompany prop in case of update company, onSubmit that calls the Service 
// according to the use of the form (add or update company), and nameDisabled prop that in case of update, is true
// because there is no permission to change an existing company name, and in case of an addition of a new company, is false
const CompanyForm = ({ defaultCompany, onSubmit, nameDisabled }) => {

    // create an initial company state using useState hook
    const [company, setCompany] = useState(defaultCompany ?? new Company());
    // create an initial errors state objects using useState hook
    const [errors, setErrors] = useState({}); //array of objects

    // create custom functions that initialize the company values
    const handleNameChange = (event) => {
        const name = event.target.value;
        if (name) {
            setErrors({ ...errors, nameError: '' });
        } else {
            setErrors({ ...errors, nameError: 'Please enter a name' });
        };
        setCompany({ ...company, name });
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        const isValid = validateEmail(email);
        if (email && isValid) {
            setErrors({ ...errors, emailError: '' });
        } else if (!isValid) {
            setErrors({ ...errors, emailError: 'Invalid Email. Please enter an email address.' });
        } else {
            setErrors({ ...errors, emailError: 'Please enter an email address' });
        }
        setCompany({ ...company, email });
    }

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        if (!password) {
            setErrors({ ...errors, passwordError: 'Please enter a password' });
        } else if (password.length < 5) {
            setErrors({ ...errors, passwordError: 'Password must be at least 5 characters.' });
        } else {
            setErrors({ ...errors, passwordError: '' });
        };
        setCompany({ ...company, password: password });
    };

    const formValidation = () => {
        const newErrors = {};
        if (!company.name) newErrors.nameError = 'Please enter a name';
        if (!company.email) newErrors.emailError = 'Please enter an email';
        else if (!validateEmail(company.email)) newErrors.emailError = 'Please enter a valid email';
        if (!company.password) newErrors.passwordError = 'Please enter a password';
        else if (company.password.length < 5) newErrors.passwordError = 'Password must be at least 5 characters.';
        return newErrors;
    };

    // create a custom function that will send the company details after validation
    const handleOnSubmit = (event) => {
        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();
        console.log('CompanyForm.js/handleOnSubmit/event: ', event, ', company: ', company);
        const newErrors = formValidation();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit(company);
        };
    };

    useEffect(() => {
        console.log('CompanyForm.js/useEffect/defaultCompany: ', defaultCompany);
        if (defaultCompany) {
            setCompany(defaultCompany);
        };
    }, [defaultCompany]
    );

    return (
        <div>
            <Form
                className='form company_form'
                onSubmit={handleOnSubmit}
            >
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Company Name
                    </Form.Label>
                    <Form.Control
                        disabled={nameDisabled}
                        type='text'
                        value={company.name}
                        placeholder='Enter name'
                        onChange={handleNameChange}
                        isInvalid={!!errors.nameError}
                    />
                    <Form.Text className='text-muted' />
                    <Form.Control.Feedback type='invalid'>
                        {errors.nameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        value={company.email}
                        placeholder='Enter email'
                        onChange={handleEmailChange}
                        isInvalid={!!errors.emailError}
                    />
                    <Form.Text className='text-muted' />
                    <Form.Control.Feedback type='invalid'>
                        {errors.emailError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='text'
                        value={company.password}
                        placeholder='Password'
                        onChange={handlePasswordChange}
                        isInvalid={!!errors.passwordError}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.passwordError}
                    </Form.Control.Feedback>
                </Form.Group>
                <MDBBtn
                    className='form_btn'
                    type='submit'
                    color='none'
                    noRipple='true'
                    size='sm'
                    floating='true'
                >
                    Send
                </MDBBtn>
            </Form>
        </div>
    );
};

export default CompanyForm;