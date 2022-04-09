// import useState hook to create a defaultCoupon state for a pre-update coupon details
// import useEffect hook, that runs on the first time the render is committed to the screen 
// and on any time the ID value changes, to fetch the pre-update coupon details
import React, { useState, useEffect } from 'react';

// import useParams hook that returns the ID in an object of key:value pairs of URL parameters
import { useParams } from 'react-router-dom';

// import CompanyService class which implements Api.js to get the current coupon and update it 
import CompanyService from '../../../share/service/CompanyService';

// import CouponForm component to receive the changed coupon
import CouponForm from '../../../share/ui/forms/CouponForm';

// import useNavigate to redirect the user to the company main page after a successful submission
import { useNavigate } from 'react-router-dom';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// that the update was successful and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import our custom css 
import '../../../styles/Form.css';

const UpdateCoupon = () => {

    const { id } = useParams();
    const [defaultCoupon, setDefaultCoupon] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // this useEffect hook runs on the first render and any time the ID value changes to fetch the coupon API data
    useEffect(() => {
        new CompanyService(dispatch)
            .getOneCoupon(id)
            .then((response) => {
                if (response.succeeded) {
                    setDefaultCoupon(response.coupon);
                    console.log('UpdateCoupon.js/useEffect/response: ', response.coupon);
                } else {
                    console.log('UpdateCoupon.js/useEffect/response: ', response.errorMessage);
                };
            })
            .catch((err) => {
                console.log('UpdateCoupon.js/useEffect/err: ', err);
            });
    }, [id]
    );

    const onUpdateCoupon = (coupon) => {
        new CompanyService(dispatch)
            .updateCoupon(coupon)
            .then(response => {
                if (response.succeeded) {
                    console.log('UpdateCoupon.js/onUpdateCoupon/response: ', response);
                    dispatch(setMessage(`The coupon ${coupon.title} updated successfully`));
                    navigate('/coupons/company');
                } else {
                    console.log('UpdateCoupon.js/onUpdateCoupon/response: ', response.errorMessage);
                    dispatch(setMessage(response.errorMessage));
                };
            })
            .catch(err => {
                console.log('UpdateCoupon.js/onUpdateCoupon/err: ', err);
            });
    };

    return (
        <div
            className='form-page'
            id='coupon_form-page'
        >
            <h3 className='form-header'>
                UPDATE COUPON
            </h3>
            <CouponForm
                titleDisabled={true}
                defaultCoupon={defaultCoupon}
                onSubmit={onUpdateCoupon}
            >
            </CouponForm>
        </div>
    );
};

export default UpdateCoupon;