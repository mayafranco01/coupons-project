import React from 'react';

// import Card from react bootstrap
import { Card } from 'react-bootstrap';

// import CompanyCardBody that contains the company details except for coupons 
import CompanyCardBody from './CompanyCardBody';

// import our custom css 
import '../../../../styles/Card.css';
import '../../../../styles/DetailsCard.css';

const CompanyDetailsCard = ({ company }) => {

    return (
        <div className='details_page'>
            <Card className='details_card'>
                <Card.Body>
                    <CompanyCardBody
                        company={company}
                    />
                    <br />
                    <Card.Text title='Coupons'>
                        <span className='card_fields'>
                            Coupons:
                        </span>
                    </Card.Text>
                    {company?.coupons && company.coupons.length > 0
                        ?
                        company.coupons.map(coupon =>
                            <Card.Text
                                key={coupon.id}
                            >
                                {coupon.title}
                            </Card.Text>
                        )
                        :
                        <span>No coupons to display</span>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default CompanyDetailsCard;