// import useEffect hook, that runs in the first time the render is committed to the screen and on 
// any time the ID value changes, to fetch the pre-update customer details
// import useState hook to create a defaultCompany to get the pre-updating customer data
import React, { useEffect, useState } from 'react';

// import useParams from react router dom to send the ID in the HTTP Request
import { useParams } from 'react-router-dom';

// import AdminService class which implements Api.js to get and update the customer in the DB
import AdminService from '../../../share/service/AdminService';

// import CustomerForm component to get the details of the updated customer
import CustomerForm from '../../../share/ui/forms/CustomerForm';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the administrator 
// that the update was successful and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import useNavigate to redirect the user to the customers page after a successful submission
import { useNavigate } from 'react-router-dom';

// import our custom css 
import '../../../styles/Form.css';

const UpdateCustomer = () => {

    const { id } = useParams();
    const [defaultCustomer, setDefaultCustomer] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // this useEffect hook runs on mount and on any time the ID value changes to fetch the customer API data
    useEffect(() => {
        new AdminService(dispatch)
            .getOneCustomer(id)
            .then(response => {
                if (response.succeeded) {
                    console.log('UpdateCustomer.js/useEffect/response: ', response);
                    setDefaultCustomer(response.customer);
                } else {
                    console.log('UpdateCustomer.js/useEffect/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('UpdateCustomer.js/useEffect/err: ', err);
            });
    }, [id]
    );

    const onUpdateCustomer = (customer) => {
        new AdminService(dispatch)
            .updateCustomer(customer)
            .then(response => {
                if (response.succeeded) {
                    console.log('UpdateCustomer.js/onUpdateCustomer/response: ', response);
                    dispatch(setMessage(`The customer ${customer.firstName} ${customer.lastName} updated successfully`));
                    navigate('/coupons/admin/customers');
                } else {
                    console.log('UpdateCustomer.js/onUpdateCustomer/response: ', response.errorMessage);
                    dispatch(setMessage(response.errorMessage));
                };
            })
            .catch(err => {
                console.log('UpdateCustomer.js/onUpdateCustomer/err: ', err);
            });
    };

    return (
        <div className='form-page'>
            <h3 className='form-header'>
                UPDATE CUSTOMER
            </h3>
            <CustomerForm
                defaultCustomer={defaultCustomer}
                onSubmit={onUpdateCustomer}
            >
            </CustomerForm>
        </div>
    );
};

export default UpdateCustomer;