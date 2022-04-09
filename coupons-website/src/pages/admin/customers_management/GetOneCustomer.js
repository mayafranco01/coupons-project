// import useState hook to create a customer state for the response setting
// import useEffect hook, that runs in the first time the render is committed to the screen and 
// on any time the ID value changes, to fetch the customer data
import React, { useEffect, useState } from 'react';

// import useParams hook that returns the ID in an object of key:value pairs of URL parameters
import { useParams } from 'react-router-dom';

// import AdminService class which implements Api.js to get the customer from the DB
import AdminService from '../../../share/service/AdminService';

// import CustomerDetailsCard component to show the customer details
import CustomerDetailsCard from '../../../share/ui/cards/customer_cards/CustomerDetailsCard';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import sortByString from SortUtil.js to sort the customer coupons titles alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/DetailsCard.css';

const GetOneCustomer = () => {

    const [customer, setCustomer] = useState();
    const dispatch = useDispatch();
    const { id } = useParams();

    async function fetchCustomer() {
        return new AdminService(dispatch)
            .getOneCustomer(id)
            .then(response => {
                if (response.succeeded) {
                    console.log('GetOneCustomer.js/fetchCustomer/response: ', response.customer);
                    return response.customer;
                } else {
                    console.log('GetOneCustomer.js/fetchCustomer/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('GetOneCustomer.js/fetchCustomer/err: ', err);
            });
    };

    async function fetchCoupons() {
        return new AdminService(dispatch)
            .getCustomerCoupons(id)
            .then(response => {
                if (response.succeeded) {
                    console.log('GetOneCustomer.js/fetchCoupons/response: ', response.coupons);
                    return response.coupons;
                } else {
                    console.log('GetOneCustomer.js/fetchCoupons/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('GetOneCustomer.js/fetchCoupons/err: ', err);
            });
    };

    const fetchData = async () => {
        let newCustomer = await fetchCustomer();
        if (newCustomer) {
            newCustomer = { ...newCustomer, coupons: await fetchCoupons() };
        };
        console.log('GetOneCustomer.js/fetchData: ', newCustomer);
        newCustomer.coupons = newCustomer.coupons.sort((a, b) => sortByString(a.title, b.title));
        setCustomer(newCustomer);
    };

    // this useEffect hook runs on mount and on any time the ID value changes to fetch the customer API data
    useEffect(() => {
        fetchData();
    }, [id]
    );

    return (
        <div className='details-page details-bg_image details'>
            <CustomerDetailsCard
                className='details-card'
                customer={customer}
            />
        </div>
    );
};

export default GetOneCustomer;