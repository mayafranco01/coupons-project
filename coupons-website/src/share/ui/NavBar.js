import React from 'react';

// import Link to link to internal paths
// import useNavigate to redirect the user to home page after logout
import { Link, useNavigate } from 'react-router-dom';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
// with connect method
import { useDispatch } from 'react-redux';

// import resetUserDetails action from redux store to reset the global states after logout
import { resetUserDetails } from '../../store/actions/ReducerActions';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import our custom css 
import '../../styles/Navbar.css';

// import our website logo
import logo from '../../assets/img/logos/flc_design2022011412801.png';

// this component receives a clientType prop from App.js that is initialized to redux clientType global state value 
// and isExpired prop that gets redux expiration global state and returns a boolean value that indicate the status 
// of the client in order to logout after the jwt token has expired
const NavBar = ({ clientType, isExpired }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // this custom function called if the user performs logout and it removes jwt token from localStorage,
    // reset redux store state and redirects the user to homepage
    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch(resetUserDetails());
        navigate('/');
    };

    return (
        <nav
            className='navbar navbar-expand-lg navbar-dark fixed-top'
            id='mainNav'
        >
            <div className='container'>
                <Link
                    className='navbar-brand'
                    to='/'>
                    <img
                        src={logo}
                        alt='website logo'
                    />
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarResponsive'
                    aria-controls='navbarResponsive'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    Menu
                    <i className='fas fa-bars ms-1' />
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarResponsive'
                >
                    <ul className='navbar-nav text-uppercase ms-auto py-4 py-lg-0'>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                to='/'
                            >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                to='/coupons/about'
                            >
                                About
                            </Link>
                        </li>
                        {clientType && !isExpired ?
                            <>
                                {clientType === 'admin' && (
                                    <>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/admin/companies'
                                            >
                                                Companies
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/admin/company/add'
                                            >
                                                Add Company
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/admin/customers'
                                            >
                                                Customers
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/admin/customer/add'
                                            >
                                                Add Customer
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {clientType === 'company' && (
                                    <>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/company/coupons'
                                            >
                                                Coupons
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/company/coupon/add'
                                            >
                                                Add Coupon
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/company/details'
                                            >
                                                Company Details
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {clientType === 'customer' && (
                                    <>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/customer/coupons'
                                            >
                                                Purchases
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/customer/purchase'
                                            >
                                                Purchase Coupon
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link
                                                className='nav-link'
                                                to='/coupons/customer/details'
                                            >
                                                Customer Details
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li className='nav-item'>
                                    <MDBBtn
                                        className='text-uppercase nav-link nav-btn'
                                        noRipple='true'
                                        size='sm'
                                        outline='true'
                                        color='none'
                                        onClick={logout}
                                    >
                                        Logout
                                    </MDBBtn>
                                </li>
                            </>
                            :
                            <>
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        to='/coupons/login'
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;