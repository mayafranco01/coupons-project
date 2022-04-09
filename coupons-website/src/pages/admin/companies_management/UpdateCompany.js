// import useState hook to create a defaultCompany to fill the pre-updating company data in the form 
// import useEffect hook, that runs in the first time the render is committed to the screen and on any 
// time the ID value changes, to fetch the pre-update company details
import React, { useEffect, useState } from 'react';

// import useParams hook that returns the ID in an object of key:value pairs of URL parameters
import { useParams } from 'react-router-dom';

// import AdminService class which implements Api.js to get and update the company in the DB
import AdminService from '../../../share/service/AdminService';

// import CompanyForm component to get the details of the updated company
import CompanyForm from '../../../share/ui/forms/CompanyForm';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the administrator 
// that the update was successful and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import useNavigate to redirect the user to the admin main page after a successful submission
import { useNavigate } from 'react-router-dom';

// import our custom css 
import '../../../styles/Form.css';

const UpdateCompany = () => {

    const { id } = useParams();
    const [defaultCompany, setDefaultCompany] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // this useEffect hook runs on mount and on any time the ID value changes to fetch the company API data
    useEffect(() => {
        new AdminService(dispatch)
            .getOneCompany(id)
            .then(response => {
                if (response.succeeded) {
                    setDefaultCompany(response.company);
                    console.log('UpdateCompany.js/useEffect/response: ', response);
                } else {
                    console.log('UpdateCompany.js/useEffect/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('UpdateCompany.js/useEffect/err: ', err);
            });
    }, [id]
    );

    const onUpdateCompany = (company) => {
        new AdminService(dispatch)
            .updateCompany(company)
            .then(response => {
                if (response.succeeded) {
                    console.log('UpdateCompany.js/onUpdateCompany/response: ', response);
                    dispatch(setMessage(`The company ${company.name} updated successfully`));
                    navigate('/coupons/admin');
                } else {
                    console.log('UpdateCompany.js/onUpdateCompany/response: ', response.errorMessage);
                    dispatch(setMessage(response.errorMessage));
                };
            })
            .catch(err => {
                console.log('UpdateCompany.js/onUpdateCompany/err: ', err);
            });
    };

    return (
        <div className='form-page'>
            <h3 className='form-header'>
                UPDATE COMPANY
            </h3>
            <CompanyForm
                nameDisabled={true}
                defaultCompany={defaultCompany}
                onSubmit={onUpdateCompany}
            >
            </CompanyForm>
        </div>
    );
};

export default UpdateCompany;