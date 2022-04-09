import React from 'react';

// import useNavigate to redirect the user to the company main page after a successful submission
import { useNavigate } from 'react-router';

// import CompanyService class which implements Api.js to add the coupon to the DB 
import CompanyService from '../../../share/service/CompanyService';

// import CouponForm component to receive coupon details for the coupon adding
import CouponForm from '../../../share/ui/forms/CouponForm';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user that the addition 
// was successful and in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import our custom css 
import '../../../styles/Form.css';

const AddCoupon = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onAddCoupon = (coupon) => {
        new CompanyService(dispatch)
            .addCoupon(coupon)
            .then(response => {
                if (response.succeeded) {
                    console.log(`AddCoupon.js/onAddCoupon/response: ${response}`);
                    dispatch(setMessage(`The coupon ${coupon.title} was successfully added`));
                    navigate('/coupons/company');
                } else {
                    console.log(`AddCoupon.js/onAddCoupon/response: ${response.errorMessage}`);
                    dispatch(setMessage(response.errorMessage));

                };
            }).catch(err => {
                console.log(`AddCoupon.js/onAddCoupon/err: ${err}`);
            });
    };

    return (
        <div 
        className='form-page' 
        id='coupon_form-page'
        >
            <h3 className='form-header'>
                ADD COUPON
            </h3>
            <CouponForm
                onSubmit={onAddCoupon}
                titleDisabled={false}
            >
            </CouponForm>
        </div>
    );
};

export default AddCoupon;