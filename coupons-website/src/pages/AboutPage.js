import React from 'react';

// import our custom css 
import '../styles/About.css';

// import the displayed images
import image1 from '../assets/img/about/about-6-200x200.jpg';
import image2 from '../assets/img/about/about-800-200x200.jpg';
import image3 from '../assets/img/about/about-972-200x200.jpg';
import image4 from '../assets/img/about/about-815-200x200.jpg';

const AboutUs = () => {

    return (
        <div>
            <section
                className='page-section'
                id='about'
            >
                <div className='container'>
                    <div className='text-center'>
                        <h2 className='section-heading text-uppercase'>
                            About
                        </h2>
                        <h3 className='section-subheading text-muted'>
                            Coupons Website
                        </h3>
                    </div>
                    <ul className='about'>
                        <li>
                            <div className='about-image'>
                                <img
                                    className='rounded-circle img-fluid'
                                    src={image1}
                                    alt='laptop'
                                />
                            </div>
                            <div className='about-panel'>
                                <div className='about-heading'>
                                    <h4 className='subheading'>
                                        Affordable Prices
                                    </h4>
                                </div>
                                <div className='about-body'>
                                    <p className='text-muted'>
                                        This site offers a variety of coupons for purchase from different companies
                                        at affordable prices.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className='about-inverted'>
                            <div className='about-image'>
                                <img
                                    className='rounded-circle img-fluid'
                                    src={image2}
                                    alt='people'
                                />
                            </div>
                            <div className='about-panel'>
                                <div className='about-heading'>
                                    <h4 className='subheading'>
                                        Discover New Experiences
                                    </h4>
                                </div>
                                <div className='about-body'>
                                    <p className='text-muted'>
                                        Coupon is a place where customers can discover new experiences every day
                                        and local businesses thrive.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='about-image'>
                                <img
                                    className='rounded-circle img-fluid'
                                    src={image3}
                                    alt='buildings'
                                />
                            </div>
                            <div className='about-panel'>
                                <div className='about-heading'>
                                    <h4 className='subheading'>
                                        Strong Partnerships
                                    </h4>
                                </div>
                                <div className='about-body'>
                                    <p className='text-muted'>
                                        Strong partnerships with great local businesses are at the very heart of Coupon
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className='about-inverted'>
                            <div className='about-image'>
                                <img
                                    className='rounded-circle img-fluid'
                                    src={image4}
                                    alt='heart'
                                />
                            </div>
                            <div className='about-panel'>
                                <div className='about-heading'>
                                    <h4 className='subheading'>
                                        Communities Thrive
                                    </h4>
                                </div>
                                <div className='about-body'>
                                    <p className='text-muted'>
                                        By connecting our customers with our merchant partners, we create relationships between loyal,
                                        repeat customers and quality local businesses that help communities thrive.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className='about-inverted'>
                            <div className='about-image'>
                                <h4>
                                    Join our
                                    <br />
                                    customer club
                                    <br />
                                    and earn!
                                </h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;