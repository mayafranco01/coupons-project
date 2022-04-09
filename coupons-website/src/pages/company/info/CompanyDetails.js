// import useState hook to create company state for received company details and a message state to present to client
// import useEffect hook to fetching the company details
import React, { useEffect, useState } from 'react';

// import companyService class to get the company details from the DB
import CompanyService from '../../../share/service/CompanyService';

// and CompanyDetailsCard component to show the details on a card
import CompanyDetailsCard from '../../../share/ui/cards/company_cards/CompanyDetailsCard';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import sortByString from SortUtil.js to sort the coupons titles alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/DetailsCard.css';

const CompanyDetails = () => {

    const [company, setCompany] = useState();
    const dispatch = useDispatch();

    async function fetchCompany() {
        return new CompanyService(dispatch)
            .getCompanyDetails()
            .then(response => {
                if (response.succeeded) {
                    console.log('CompanyDetails.js/fetchCompany/response: ', response.company);
                    return response.company;
                } else {
                    console.log('CompanyDetails.js/fetchCompany/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CompanyDetails.js/fetchCompany/err: ', err);
            });
    };

    async function fetchCoupons() {
        return new CompanyService(dispatch)
            .getAllCoupons()
            .then(response => {
                if (response.succeeded) {
                    console.log('CompanyDetails.js/fetchCoupons/response: ', response.coupons);
                    return response.coupons;
                } else {
                    console.log('CompanyDetails.js/fetchCoupons/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CompanyDetails.js/fetchCoupons/err: ', err);
            });
    };

    const fetchData = async () => {
        let newCompany = await fetchCompany();
        if (newCompany) {
            newCompany = { ...newCompany, coupons: await fetchCoupons() };
        };
        console.log('CompanyDetails.js/fetchData: ', newCompany);
        newCompany.coupons = newCompany.coupons.sort((a, b) => sortByString(a.title, b.title));
        setCompany(newCompany);
    };

    // this useEffect hook runs on mount to fetch the company API data
    useEffect(() => {
        fetchData();
    }, []
    );

    return (
        <div className='details-page'>
            <CompanyDetailsCard
                className='details details-card'
                company={company}
            />
        </div>
    );
};

export default CompanyDetails;