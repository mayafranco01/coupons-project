import React from 'react';

// import Card from react-bootstrap to create a coupon view card with a purchase coupon button
import { Card } from 'react-bootstrap';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import icon from react icons
import { MdAdd } from 'react-icons/md';

// import CustomerService Class that implements Api.js 
import CustomerService from '../../../service/CustomerService';

// import CouponCardBody that contains the basic details of a coupon card
import CouponCardBody from './CouponCardBody';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// that the purchase was successful or failed and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../../store/actions/ReducerActions';

// import Col from react-bootstrap for the styling of the cards position on the page 
import { Col } from 'react-bootstrap';

// import our custom css 
import '../../../../styles/CouponCard.css';

const CouponToPurchaseCard = ({ coupon }) => {

    const dispatch = useDispatch();

    if (!coupon) {
        return (
            <div>loading...</div>
        );
    };

    const onAddCouponPurchase = (event) => {
        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();
        new CustomerService(dispatch)
            .purchaseCoupon(coupon)
            .then((response) => {
                if (response.succeeded) {
                    console.log('CouponToPurchaseCard.js/onAddCouponPurchase/response: ', response);
                    dispatch(setMessage(`The coupon ${coupon.title} purchased successfully`));
                } else {
                    console.log('CouponToPurchaseCard.js/onAddCouponPurchase/response: ', response.errorMessage);
                    dispatch(setMessage(response.errorMessage));
                };
            })
            .catch(err => {
                console.log('CouponToPurchaseCard.js/onAddCouponPurchase/err: ', err);
                dispatch(setMessage('The coupon you selected was not added to the basket, please try again'));
            });
    };

    return (
        <Col xs={4}>
            <Card className='coupon_card-card'>
                <Card.Body>
                    <MDBBtn
                        className='add_btn'
                        title='Purchase Coupon'
                        noRipple='true'
                        color='dark'
                        size='sm'
                        onClick={onAddCouponPurchase}
                    >
                        {<MdAdd />}
                    </MDBBtn>
                    <CouponCardBody coupon={coupon} />
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CouponToPurchaseCard;