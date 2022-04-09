import React from 'react';

// import Card from react-bootstrap to create a customer view card
import { Card } from 'react-bootstrap';

// import our custom css 
import '../../../../styles/Card.css';

// this component receives a customer object property to create a card view of a customer depending on different needs 
const CustomerCardBody = ({ customer }) => {

    if (!customer) {
        return (
            <div className='card_name'>loading...</div>
        );
    };

    return (
        <div>
            <Card.Title
                className='card_name'
                title='Customer Name'
            >
                {customer.firstName}
                &nbsp;
                {customer.lastName}
            </Card.Title>
            <Card.Text title='ID'>
                <span className='card_fields'>
                    ID:
                </span>
                {customer.id}
            </Card.Text>
            <Card.Text title='Email'>
                <span className='card_fields'>
                    Email:
                </span>
                <br />
                {customer.email}
            </Card.Text>
            <Card.Text title='Password'>
                <span className='card_fields'>
                    Password:
                </span>
                {customer.password}
            </Card.Text>
        </div>
    );
};

export default CustomerCardBody;