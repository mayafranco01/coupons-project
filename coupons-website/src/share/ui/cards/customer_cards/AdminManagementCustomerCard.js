import React from 'react';

// import Card from react-bootstrap to create a customer view card
import { Card } from 'react-bootstrap';

// import Link to link to internal paths
import { Link } from 'react-router-dom';

// import icons from react icons
import { 
    RiPencilLine, 
    RiDeleteBin5Line 
} from 'react-icons/ri';
import { MdPageview } from 'react-icons/md';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import AdminService Class that implements Api.js to delete a customer from the DB and its card from the client side 
// when the administrator presses the delete button on the card 
import AdminService from '../../../service/AdminService';

// import CustomerCardBody that contains the basic details of a customer card
import CustomerCardBody from './CustomerCardBody';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the administrator 
// that the deletion was successful
import { setMessage } from '../../../../store/actions/ReducerActions';

// import our custom css 
import '../../../../styles/Card.css';

// this Component receives from AllCustomers.js a customer details object property which is presented in the card and 
// onFinishDelete that responsible to fetch all customers after a customer deletion
const AdminManagementCustomerCard = ({ customer, onFinishDelete }) => {

    const dispatch = useDispatch();

    const onDeleteCustomer = () => {
        new AdminService(dispatch)
            .deleteCustomer(customer.id)
            .then(response => {
                if (response.succeeded) {
                    console.log('AdminManagementCustomerCard.js/onDeleteCustomer/response: ', response.succeeded);
                    dispatch(setMessage(`The customer ${customer.firstName} ${customer.lastName} deleted successfully`));
                    onFinishDelete();
                } else {
                    console.log('AdminManagementCustomerCard.js/onDeleteCustomer/response: ', response.errorMessage);
                };
            })
            .catch((err) => {
                console.log('AdminManagementCustomerCard.js/onDeleteCustomer/err: ', err.message);
            });
    };

    return (
        <div>
            <Card className='card'>
                <Card.Body>
                    <Link
                        title='Update Customer'
                        to={'/coupons/admin/customer/update/' + customer.id}>
                        {<RiPencilLine />}
                    </Link>
                    <Link
                        title='Show Customer Details'
                        className='search_btn'
                        to={'/coupons/admin/customer/' + customer.id}
                    >
                        {<MdPageview />}
                    </Link>
                    <MDBBtn
                        title='Delete Customer'
                        className='delete_btn'
                        noRipple='false'
                        size='sm'
                        outline='true'
                        color='none'
                        onClick={onDeleteCustomer}
                    >
                        {<RiDeleteBin5Line />}
                    </MDBBtn>
                    <CustomerCardBody customer={customer} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminManagementCustomerCard;