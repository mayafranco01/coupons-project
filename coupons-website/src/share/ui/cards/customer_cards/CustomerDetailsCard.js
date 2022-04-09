import React from 'react';

// import Card from react bootstrap
import { Card } from 'react-bootstrap';

// import CustomerCardBody that contains the customer details except for coupon purchases
import CustomerCardBody from './CustomerCardBody';

// import our custom css 
import '../../../../styles/Card.css';
import '../../../../styles/DetailsCard.css';

const CustomerDetailsCard = ({ customer }) => {

    return (
        <div className='details_page'>
            <Card className='details_card'>
                <Card.Body>
                    <CustomerCardBody
                        customer={customer}
                    />
                    <br />
                    <Card.Text title='Purchases'>
                        <span className='card_fields'>
                            Purchases:
                        </span>
                    </Card.Text>
                    {customer?.coupons && customer.coupons.length > 0
                        ?
                        customer.coupons.map(coupon =>
                            <Card.Text
                                key={coupon.id}
                            >
                                {coupon.title}
                            </Card.Text>
                        )
                        :
                        <span>No purchases to display</span>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default CustomerDetailsCard;