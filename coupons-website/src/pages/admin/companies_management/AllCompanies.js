// import useState hook to create a companies state for the response setting 
// import useEffect hook, which runs just in the first time the render is committed to the screen, 
// to fetch all the companies from the DB
import React, { useEffect, useState } from 'react';

// import AdminService Class which implements Api.js to get all the companies from the DB
import AdminService from '../../../share/service/AdminService';

// import AdminManagementCompanyCard component for the client companies view that contains in every card edit and delete buttons
import AdminManagementCompanyCard from '../../../share/ui/cards/company_cards/AdminManagementCompanyCard';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import sortByString from SortUtil.js to sort the cards alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/Card.css';

const AllCompanies = () => {

    const [companies, setCompanies] = useState([]);
    const dispatch = useDispatch();

    // this useEffect hook runs once on mount and fetches all companies API data
    useEffect(() => {
        fetchCompanies();
    }, []
    );

    function fetchCompanies() {
        new AdminService(dispatch)
            .getAllCompanies()
            .then(response => {
                if (response.succeeded) {
                    console.log('AllCompanies.js/fetchCompanies/response: ', response);
                    setCompanies(response.companies.sort((a, b) => sortByString(a.name, b.name)));
                } else {
                    console.log('AllCompanies.js/fetchCompanies/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllCompanies.js/fetchCompanies/err: ', err);
            });
    };

    return (
        <div className='card-container'>
            {companies && (companies.map(company =>
                <AdminManagementCompanyCard
                    key={company.id}
                    company={company}
                    onFinishDelete={fetchCompanies}
                />
            ))}
        </div>
    );
};

export default AllCompanies;