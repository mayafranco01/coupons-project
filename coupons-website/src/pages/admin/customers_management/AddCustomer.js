import React from 'react';

// import AdminService Class which implements Api.js to add the customer to the DB
import AdminService from '../../../share/service/AdminService';

// import CustomerForm component to get the details of the new customer
import CustomerForm from '../../../share/ui/forms/CustomerForm';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the administrator 
// that the addition was successful and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import useNavigate to redirect the user to the customers page after a successful submission
import { useNavigate } from 'react-router-dom';

// import our custom css 
import '../../../styles/Form.css';

const AddCustomer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddCustomer = (customer) => {
        new AdminService(dispatch)
            .addCustomer(customer)
            .then(response => {
                if (response.succeeded) {
                    dispatch(setMessage(`The customer ${customer.firstName} ${customer.lastName} was successfully added`));
                    console.log(`AddCustomer.js/onAddCustomer/response: ${response}`);
                    navigate('/coupons/admin/customers');
                } else {
                    console.log(`AddCustomer.js/onAddCustomer/response: ${response.errorMessage}`);
                    dispatch(setMessage(response.errorMessage));
                };
            }).catch(err => {
                console.log(`AddCustomer.js/onAddCustomer/err: ${err}`);
            });
    };

    return (
        <div className='form-page'>
            <h3 className='form-header'>
                ADD CUSTOMER
            </h3>
            <CustomerForm
                onSubmit={onAddCustomer}
            >
            </CustomerForm>
        </div>
    );
};

export default AddCustomer;