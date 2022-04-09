// import useState hook to create a customer state to set the details
// import useEffect hook, which runs just in the first time the render is committed to the screen, 
// to fetching the customer details data
import React, { useEffect, useState } from 'react';

// import CustomerService class to get the customer details and CustomerDetailsCard component to show the details
import CustomerService from '../../../share/service/CustomerService';
import CustomerDetailsCard from '../../../share/ui/cards/customer_cards/CustomerDetailsCard';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import sortByString from SortUtil.js to sort the coupons titles alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/DetailsCard.css';

const CustomerDetails = () => {

    const [customer, setCustomer] = useState();
    const dispatch = useDispatch();

    async function fetchCustomer() {
        return new CustomerService(dispatch)
            .getCustomerDetails()
            .then(response => {
                if (response.succeeded) {
                    console.log('CustomerDetails.js/fetchCustomer/response: ', response.customer);
                    return response.customer;
                } else {
                    console.log('CustomerDetails.js/fetchCustomer/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CustomerDetails.js/fetchCustomer/err: ', err);
            });
    };

    async function fetchCoupons() {
        return new CustomerService(dispatch)
            .getCustomerCoupons()
            .then(response => {
                if (response.succeeded) {
                    console.log('CustomerDetails.js/fetchCoupons/response: ', response.coupons);
                    return response.coupons;
                } else {
                    console.log('CustomerDetails.js/fetchCoupons/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CustomerDetails.js/fetchCoupons/err: ', err);
            });
    };

    const fetchData = async () => {
        let newCustomer = await fetchCustomer();
        if (newCustomer) {
            newCustomer = { ...newCustomer, coupons: await fetchCoupons() };
        };
        console.log('CustomerDetails.js/fetchData/newCustomer: ', newCustomer);
        newCustomer.coupons = newCustomer.coupons.sort((a, b) => sortByString(a.title, b.title));
        setCustomer(newCustomer);
    };

    // this useEffect hook runs on mount to fetch the customer API data
    useEffect(() => {
        fetchData();
    }, []
    );

    return (
        <div className='details-page'>
            <CustomerDetailsCard
                className='details details-card'
                customer={customer}
            />
        </div>
    );
};

export default CustomerDetails;