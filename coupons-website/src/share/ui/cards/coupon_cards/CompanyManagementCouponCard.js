import React from 'react';

// import Link to link to internal paths
import { Link } from 'react-router-dom';

// import Card from react-bootstrap to create a coupon view card that contains delete and edit buttons
import { Card } from 'react-bootstrap';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import icons from react icons
import {
    RiPencilLine,
    RiDeleteBin5Line
} from 'react-icons/ri';

// import CompanyService Class that implements Api.js to delete a coupon from the DB and its card from the client side 
// when the user presses the delete button on the card 
import CompanyService from '../../../service/CompanyService';

// import CouponCardBody that contains the basic details of a coupon card
import CouponCardBody from './CouponCardBody';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// that the deletion was successful
import { setMessage } from '../../../../store/actions/ReducerActions';

// import our custom css 
import '../../../../styles/CouponCard.css';

// this Component receives from AllCoupons.js a coupon details object property which is presented in the card and 
// onFinishDelete that responsible to fetch all coupons after a coupon deletion
const CompanyHandledCouponCard = ({ coupon, onFinishDelete }) => {

    const dispatch = useDispatch();

    const onDeleteCoupon = () => {
        new CompanyService(dispatch)
            .deleteCoupon(coupon.id)
            .then(response => {
                if (response.succeeded) {
                    console.log('CompanyHandledCouponCard.js/onDeleteCoupon/response: ', response.succeeded);
                    dispatch(setMessage(`The coupon ${coupon.title} deleted successfully`));
                    onFinishDelete();
                } else {
                    console.log('CompanyHandledCouponCard.js/onDeleteCoupon/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CompanyHandledCouponCard.js/onDeleteCoupon/err: ', err);
            });
    };

    return (
        <div className='coupon_card-card'>
            <Card>
                <Card.Body>
                    <Link
                        title='Edit Coupon'
                        to={'/coupons/company/coupon/update/' + coupon.id}>
                        {<RiPencilLine />}
                    </Link>
                    <MDBBtn
                        title='Delete Coupon'
                        className='delete_btn'
                        noRipple='true'
                        outline='true'
                        color='none'
                        onClick={onDeleteCoupon}
                    >
                        {<RiDeleteBin5Line />}
                    </MDBBtn>
                    <CouponCardBody coupon={coupon} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default CompanyHandledCouponCard;