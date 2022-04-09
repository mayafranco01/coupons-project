import React from 'react';

// import Card from react-bootstrap to create a company cards view
import { Card } from 'react-bootstrap';

// import Link to link to internal paths
import { Link } from 'react-router-dom';

// import AdminService Class that implements Api.js to delete a company from the DB and its card from the client side 
// when the administrator presses the delete button on the card 
import AdminService from '../../../service/AdminService';

// import CompanyCardBody that contains the basic details of a company card
import CompanyCardBody from './CompanyCardBody';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import icons from react icons
import { 
    RiPencilLine, 
    RiDeleteBin5Line 
} from 'react-icons/ri';
import { MdPageview } from 'react-icons/md';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the administrator 
// that the deletion was successful
import { setMessage } from '../../../../store/actions/ReducerActions';

// import our custom css 
import '../../../../styles/Card.css';

// this Component receives from AllCompanies.js a company details object property which is presented in the card and 
// onFinishDelete that responsible to fetch all companies after a company deletion
const AdminManagementCompanyCard = ({ company, onFinishDelete }) => {

    const dispatch = useDispatch();

    const onDeleteCompany = () => {
        new AdminService(dispatch)
            .deleteCompany(company.id)
            .then(response => {
                if (response.succeeded) {
                    console.log('AdminManagementCompanyCard.js/onDeleteCompany/response: ', response);
                    dispatch(setMessage(`The company ${company.name} deleted successfully`));
                    onFinishDelete();
                } else {
                    console.log('AdminManagementCompanyCard.js/onDeleteCompany/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AdminManagementCompanyCard.js/onDeleteCompany/err: ', err);
            });
    };

    return (
        <div>
            <Card className='card'>
                <Card.Body>
                    <Link
                        title='Update Company'
                        to={'/coupons/admin/company/update/' + company.id}
                    >
                        {<RiPencilLine />}
                    </Link>
                    <Link
                        title='Show Company Details'
                        className='search_btn'
                        to={'/coupons/admin/company/' + company.id}
                    >
                        {<MdPageview />}
                    </Link>
                    <MDBBtn
                        title='Delete Company'
                        className='delete_btn'
                        onClick={onDeleteCompany}
                        noRipple='true'
                        size='sm'
                        outline='true'
                        color='none'
                    >
                        {<RiDeleteBin5Line />}
                    </MDBBtn>
                    <CompanyCardBody
                        company={company}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminManagementCompanyCard;