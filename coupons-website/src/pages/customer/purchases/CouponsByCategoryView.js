// import useEffect hook, which runs for the first time the render is committed to the screen and on any time 
// the category value changes, to fetch the coupons from this category
// import useState hook to create a coupons state to set the coupons from the DB
import React, { useEffect, useState } from 'react';

// import CategoryService class which implements CategoryApi.js to get the coupons by a category from the DB
import CategoryService from '../../../share/service/CategoryService';

// import CustomerPurchaseCouponCard component to display to the user all coupons from the chosen category with a purchase button
import CustomerPurchaseCouponCard from '../../../share/ui/cards/coupon_cards/CustomerPurchaseCouponCard';

// import useParams hook that returns the category in an object of key:value pairs of URL parameters
import { useParams } from 'react-router-dom';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import Container and Row from react-bootstrap for the styling of the cards position on the page 
import { Container, Row } from 'react-bootstrap';

// import our custom css 
import '../../../styles/CouponCard.css';

const CouponsByCategoryView = () => {

    const [coupons, setCoupons] = useState([]);
    const dispatch = useDispatch();
    const { category } = useParams();

    // this useEffect hook runs on mount and on any time the category value changes to fetch all category coupons API data
    useEffect(() => {
        fetchCoupons();
    }, [category]
    );

    function fetchCoupons() {
        new CategoryService(dispatch)
            .getCouponsByCategory(category)
            .then(response => {
                if (response.succeeded) {
                    setCoupons(response.coupons);
                    console.log('CouponsByCategoryView.js/fetchCoupons/response: ', response.coupons);
                } else {
                    console.log('CouponsByCategoryView.js/fetchCoupons/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CouponsByCategoryView.js/fetchCoupons/err: ', err);
            });
    };

    return (
        <Container className='coupon_card-card'>
            <Row>
                {coupons && (coupons.map(coupon =>
                    <CustomerPurchaseCouponCard
                        key={coupon.id}
                        coupon={coupon}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default CouponsByCategoryView;