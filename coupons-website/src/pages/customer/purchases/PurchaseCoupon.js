import React from 'react';

// import CategoriesView component to allow the customer to see coupons of choice from category when purchasing coupon 
import CategoriesView from './CategoriesView';

// import our custom css 
import '../../../styles/CategoryCard.css';

const PurchaseCoupon = () => {

    return (
        <div>
            <CategoriesView />
        </div>
    );
};

export default PurchaseCoupon;