import React from 'react';

// import our custom css 
import '../styles/Homepage.css';

export function HomePage() {

    return (
        <div>
            <header className='masthead'>
                <div className='container'>
                    <div className='masthead-subheading'>
                        Welcome to our coupons website!
                    </div>
                    <div className='masthead-heading text-uppercase'>
                        Coupons Make Cents
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HomePage;
