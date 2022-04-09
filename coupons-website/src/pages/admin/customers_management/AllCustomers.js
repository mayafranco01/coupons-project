// import useState hook to create a customers state for the response setting
// import useEffect hook, which runs just in the first time the render is committed to the screen, 
// to fetch all the customers from the DB
import React, { useState, useEffect } from 'react';

// import AdminService Class that implements Api.js to get all the customers from the DB
import AdminService from '../../../share/service/AdminService';

// import AdminManagementCustomerCard component for the client customers view that contains in every card edit and delete buttons
import AdminManagementCustomerCard from '../../../share/ui/cards/customer_cards/AdminManagementCustomerCard';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import sortByString from SortUtil.js to sort the cards alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/Card.css';

const AllCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const dispatch = useDispatch();

    // this useEffect hook runs once on mount and fetches all customers API data
    useEffect(() => {
        fetchCustomers();
    }, []
    );

    function fetchCustomers() {
        new AdminService(dispatch)
            .getAllCustomers()
            .then(response => {
                if (response.succeeded) {
                    console.log('AllCustomers.js/fetchCustomers/response: ', response);
                    setCustomers(response.customers.sort((a, b) => sortByString(a.firstName, b.firstName)));
                } else {
                    console.log('AllCustomers.js/fetchCustomers/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllCustomers.js/fetchCustomers/err: ', err);
            });
    };

    return (
        <div className='card-container'>
            {customers && (customers.map(customer =>
                <AdminManagementCustomerCard
                    key={customer.id}
                    customer={customer}
                    onFinishDelete={fetchCustomers}
                />
            ))}
        </div>
    );
};

export default AllCustomers;