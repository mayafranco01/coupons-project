// import useState hook to create a purchases state for the response, maxPriceModalState, categoryModalState, 
// loading and filterState states
// import useEffect hook, which runs just in the first time the render is committed to the screen, 
// to fetch all the customer purchases
import React, { useEffect, useState } from 'react';

// import CustomerService class to get the customer purchases
import CustomerService from '../../../share/service/CustomerService';

// import MaxPriceModalForm and CategoryModalForm for a display of purchases by a specific criterion
import MaxPriceModalForm from '../../../share/ui/forms/filter_modals/MaxPriceModalForm';
import CategoryModalForm from '../../../share/ui/forms/filter_modals/CategoryModalForm';

// import CouponCard component to display the purchases
import CouponCard from '../../../share/ui/cards/coupon_cards/CouponCard';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// if there are no purchases from a category or up to the price that sent on the modal form 
import { setMessage } from '../../../store/actions/ReducerActions';

// import Container, Row and Col from react-bootstrap for the styling of the cards position on the page 
import { Container, Row, Col } from 'react-bootstrap';

// import sortByString from SortUtil.js to sort the cards alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/CouponCard.css';

const AllPurchases = () => {

    const [purchases, setPurchases] = useState([]);
    const [maxPriceModalState, setMaxPriceModalState] = useState(false);
    const [categoryModalState, setCategoryModalState] = useState(false);
    const [filterState, setFilterState] = useState();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    //  returns customer coupons by maximum price
    const onFilterByMaxPrice = async (maxPrice) => {
        setLoading(true);
        // console.log('AllPurchases.js/onFilterByMaxPrice/maxPrice: ', maxPrice);
        await new CustomerService(dispatch)
            .getCustomerPurchasesByMaxPrice(maxPrice)
            .then(response => {
                if (response.succeeded) {
                    console.log('AllPurchases.js/onFilterByCategory/response: ', response.coupons);
                    setPurchases(response.coupons.sort((a, b) => sortByString(a.title, b.title)));
                    setFilterState(`filtered by price up to ${maxPrice} NIS`)
                    if (response.coupons.length < 1) {
                        dispatch(setMessage(`You don't have purchases that are priced up to ${maxPrice} NIS`));
                    };
                } else {
                    console.log('AllPurchases.js/onFilterByCategory/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllPurchases.js/onFilterByCategory/err: ', err);
            });
        setLoading(false);
    };

    //  returns customer coupons by category
    const onFilterByCategory = async (category) => {
        setLoading(true);
        // console.log('AllPurchases.js/onFilterByCategory/category: ', category);
        await new CustomerService(dispatch)
            .getCustomerPurchasesByCategory(category.id)
            .then(response => {
                if (response.succeeded) {
                    console.log('AllPurchases.js/onFilterByCategory/response: ', response.coupons);
                    setPurchases(response.coupons.sort((a, b) => sortByString(a.title, b.title)));
                    setFilterState(`filtered by the category ${category.name}`);
                    if (response.coupons.length < 1) {
                        dispatch(setMessage(`You don't have purchases from the category ${category.name}`));
                    };
                } else {
                    console.log('AllPurchases.js/onFilterByCategory/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllPurchases.js/onFilterByCategory/err: ', err);
            });
        setLoading(false);
    };

    //  returns all customer coupons 
    async function fetchAllPurchases() {
        setLoading(true);
        await new CustomerService(dispatch)
            .getCustomerCoupons()
            .then(response => {
                if (response.succeeded) {
                    console.log('AllPurchases.js/fetchAllPurchases/response: ', response.coupons);
                    setPurchases(response.coupons.sort((a, b) => sortByString(a.title, b.title)));
                    setFilterState('');
                } else {
                    console.log('AllPurchases.js/fetchAllPurchases/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllPurchases.js/fetchAllPurchases/err: ', err);
            });
        setLoading(false);
    };

    // this useEffect hook runs once on mount and fetches all customer purchases API data
    useEffect(() => {
        fetchAllPurchases();
    }, []
    );

    // displays 'loading...' while data uploads
    if (loading) {
        return (
            <div className='loading'>loading...</div>
        );
    };

    return (
        <div>
            <div className='filter_bar'>
                <MDBBtn
                    className='category_btn'
                    type='submit'
                    color='none'
                    noRipple='true'
                    size='sm'
                    floating='true'
                    onClick={() => setCategoryModalState(true)}
                >
                    Filter By Category
                </MDBBtn>
                <MDBBtn
                    className='price_btn'
                    type='submit'
                    color='none'
                    noRipple='true'
                    size='sm'
                    floating='true'
                    onClick={() => setMaxPriceModalState(true)}
                >
                    Filter By Maximum Price
                </MDBBtn>
                <span className='filter_state'>{filterState}</span>
                <MDBBtn
                    className='clear_btn'
                    type='submit'
                    color='none'
                    noRipple='true'
                    size='sm'
                    floating='true'
                    onClick={fetchAllPurchases}
                >
                    Clear Filter
                </MDBBtn>
            </div>
            <MaxPriceModalForm
                setIsOpen={setMaxPriceModalState}
                isOpen={maxPriceModalState}
                onSubmit={onFilterByMaxPrice}
            />
            <CategoryModalForm
                setIsOpen={setCategoryModalState}
                isOpen={categoryModalState}
                onSubmit={onFilterByCategory}
            />
            {!purchases || purchases.length < 1 ?
                //  returns a background image of zero if no purchases were found for the filter 
                <div className='no_coupons' />
                :
                <Container>
                    <Row>
                        {(purchases.map(coupon =>
                            <Col xs={4}
                                key={coupon.id}
                            >
                                <CouponCard
                                    coupon={coupon}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            }
        </div>
    );
};

export default AllPurchases;