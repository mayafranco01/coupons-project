import React from 'react';

// import Card from react-bootstrap to create a coupon view card
import { Card } from 'react-bootstrap';

// import CouponCardBody that contains the basic details of a coupon card
import CouponCardBody from './CouponCardBody';

// import our custom css 
import '../../../../styles/CouponCard.css';

const CouponCard = ({ coupon }) => {

    return (
            <Card className='coupon_card-card'>
                <Card.Body>
                    <CouponCardBody
                        coupon={coupon}
                    />
                </Card.Body>
            </Card>
    );
};

export default CouponCard;