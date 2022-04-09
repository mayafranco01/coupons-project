import React from 'react';

// import Card from react-bootstrap to create a coupon view card
import { Card } from 'react-bootstrap';

// import our custom css 
import '../../../../styles/CouponCard.css';

// this component receives a coupon object property to create a card view of a coupon depending on different needs 
const CouponCardBody = ({ coupon }) => {

    // used to access to coupons images in the folder public
    const path = process.env.PUBLIC_URL;
    const directory = '/assets/img/coupons/';

    if (!coupon) {
        return (
            <div>Loading...</div>
        );
    };

    return (
        <div>
            <Card.Title className='coupon_card-title'>
                {coupon.title}
            </Card.Title>
            <Card.Img
                className='coupon_card-image'
                variant='top'
                src=
                {coupon.image.includes('http')
                    ?
                    coupon.image
                    :
                    path + directory + coupon.image
                }
            />
            <Card.Text>
                <span className='coupon_card-fields'>
                    ID:
                </span>
                {coupon.id}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    Company:
                </span>
                {coupon.company.name}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    Category:
                </span>
                {coupon.category.name}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    Description:
                </span>
                {coupon.description}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    Start Date:
                </span>
                {coupon.startDate}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    End Date:
                </span>
                {coupon.endDate}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    Amount:
                </span>
                {coupon.amount}
            </Card.Text>
            <Card.Text>
                <span className='coupon_card-fields'>
                    Price:
                </span>
                {coupon.price} ILS
            </Card.Text>
        </div>
    );
};

export default CouponCardBody;