// import useState hook to create a company state for the response setting
// import useEffect hook, which runs in the first time the render is committed to the screen, 
// and on any time the ID value changes, to fetch the company data
import React, { useEffect, useState } from 'react';

// import useParams hook that returns the ID in an object of key:value pairs of URL parameters
import { useParams } from 'react-router-dom';

// import AdminService class which implements Api.js to get the company from the DB
import AdminService from '../../../share/service/AdminService';

// import CompanyDetailsCard component to show company details
import CompanyDetailsCard from '../../../share/ui/cards/company_cards/CompanyDetailsCard';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import sortByString from SortUtil.js to sort the company coupons titles alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/DetailsCard.css';

const GetOneCompany = () => {

    const [company, setCompany] = useState();
    const dispatch = useDispatch();
    const { id } = useParams();

    async function fetchCompany() {
        return new AdminService(dispatch)
            .getOneCompany(id)
            .then(response => {
                if (response.succeeded) {
                    console.log('GetOneCompany.js/fetchCompany/response: ', response.company);
                    return response.company;
                } else {
                    console.log('GetOneCompany.js/fetchCompany/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('GetOneCompany.js/fetchCompany/err: ', err);
            });
    };

    async function fetchCoupons() {
        return new AdminService(dispatch)
            .getCompanyCoupons(id)
            .then(response => {
                if (response.succeeded) {
                    console.log('GetOneCompany.js/fetchCoupons/response: ', response.coupons);
                    return response.coupons;
                } else {
                    console.log('GetOneCompany.js/fetchCoupons/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('GetOneCompany.js/fetchCoupons/err: ', err);
            });
    };

    const fetchData = async () => {
        let newCompany = await fetchCompany();
        if (newCompany) {
            newCompany = { ...newCompany, coupons: await fetchCoupons() };
        };
        console.log('GetOneCompany.js/fetchData: ', newCompany);
        newCompany.coupons = newCompany.coupons.sort((a, b) => sortByString(a.title, b.title));
        setCompany(newCompany);
    };

    // this useEffect hook runs on mount and on any time the ID value changes to fetch the company API data
    useEffect(() => {
        fetchData();
    }, [id]
    );

    return (
        <div className='details-page details-bg_image details'>
            <CompanyDetailsCard
                className='details-card'
                company={company}
            />
        </div>
    );
};

export default GetOneCompany;