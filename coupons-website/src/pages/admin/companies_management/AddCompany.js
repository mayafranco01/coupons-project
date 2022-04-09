import React from 'react';

// import AdminService Class which implements Api.js to add the company to the DB
import AdminService from '../../../share/service/AdminService';

// import CompanyForm component to get the details of the new company
import CompanyForm from '../../../share/ui/forms/CompanyForm';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the administrator 
// that the addition was successful and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import useNavigate to redirect the user to the admin main page after a successful submission
import { useNavigate } from 'react-router-dom';

// import our custom css 
import '../../../styles/Form.css';

const AddCompany = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddCompany = (company) => {
        new AdminService(dispatch)
            .addCompany(company)
            .then(response => {
                if (response.succeeded) {
                    console.log(`AddCompany.js/onAddCompany/response: ${response}`);
                    dispatch(setMessage(`The company ${company.name} was successfully added`));
                    navigate('/coupons/admin');
                } else {
                    console.log(`AddCompany.js/onAddCompany/response: ${response.errorMessage}`);
                    dispatch(setMessage(response.errorMessage));
                };
            }).catch(err => {
                console.log(`AddCompany.js/onAddCompany/err: ${err}`);
            });
    };

    return (
        <div className='form-page'>
            <h3 className='form-header'>
                ADD COMPANY
            </h3>
            <CompanyForm
                nameDisabled={false}
                onSubmit={onAddCompany}
            />
        </div>
    );
};

export default AddCompany;
