// import useState hook to create a customer state that will send to its parent Component with data from the form
// and an array of error objects that are displayed to the user if values are empty or invalid

// import useEffect hook, that runs in the first time the render is committed to the screen and on any time 
// the defaultCustomer value changes and is used for getting the customer's data for editing in case of an update customer request
import React, { useState, useEffect } from 'react';

// import Form from react-bootstrap to create a customer add/ update form
import { Form } from 'react-bootstrap';

// import Customer Class from model
import Customer from '../../model/core.customer';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import our custom css 
import '../../../styles/Form.css';

// this Component receives a defaultCustomer prop in case of update customer and onSubmit that calls the Service 
// according to the use of the form (add or update customer)
const CustomerForm = ({ defaultCustomer, onSubmit }) => {

    // create an initial customer state using useState hook
    const [customer, setCustomer] = useState(defaultCustomer ?? new Customer());
    const [errors, setErrors] = useState({});

    // create custom functions that initialize the customer values
    const handleFirstNameChange = (event) => {
        const firstName = event.target.value;
        if (firstName) {
            setErrors({ ...errors, firstNameError: '' });
        } else {
            setErrors({ ...errors, firstNameError: 'Please enter a first name' });
        };
        setCustomer({ ...customer, firstName });
    };

    const handleLastNameChange = (event) => {
        const lastName = event.target.value;
        if (lastName) {
            setErrors({ ...errors, lastNameError: '' });
        } else {
            setErrors({ ...errors, lastNameError: 'Please enter a last name' });
        };
        setCustomer({ ...customer, lastName });
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
        };
        setCustomer({ ...customer, email });
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        if (!password) {
            setErrors({ ...errors, passwordError: 'Please enter a password' });
        } else if (password.length < 5) {
            setErrors({ ...errors, passwordError: 'Password must be at least 5 characters.' });
        } else {
            setErrors({ ...errors, passwordError: '' });
        };
        setCustomer({ ...customer, password: password });
    };

    const formValidation = () => {
        const newErrors = {};
        if (!customer.firstName) newErrors.firstNameError = 'Please enter a first name';
        if (!customer.lastName) newErrors.lastNameError = 'Please enter a last name';
        if (!customer.email) newErrors.emailError = 'Please enter an email';
        else if (!validateEmail(customer.email)) newErrors.emailError = 'Please enter a valid email';
        if (!customer.password) newErrors.passwordError = 'Please enter a password';
        else if (customer.password.length < 5) newErrors.passwordError = 'Password must be at least 5 characters.';
        return newErrors;
    };

    // create a custom function that will send the customer details after validation 
    const handleOnSubmit = (event) => {
        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();
        console.log('CustomerForm.js/handleOnSubmit/event: ', event, ', customer: ', customer);
        const newErrors = formValidation();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit(customer);
        };
    };

    useEffect(() => {
        if (defaultCustomer) {
            setCustomer(defaultCustomer);
        }
    }, [defaultCustomer]
    );

    return (
        <div>
            <Form className='form'
                onSubmit={handleOnSubmit}
            >
                <Form.Group className='mb-3'>
                    <Form.Label>
                        First Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        value={customer.firstName}
                        placeholder='Enter first name'
                        onChange={handleFirstNameChange}
                        isInvalid={!!errors.firstNameError}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                        {errors.firstNameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        value={customer.lastName}
                        placeholder='Enter last name'
                        onChange={handleLastNameChange}
                        isInvalid={!!errors.lastNameError}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                        {errors.lastNameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        value={customer.email}
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
                        value={customer.password}
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

export default CustomerForm;