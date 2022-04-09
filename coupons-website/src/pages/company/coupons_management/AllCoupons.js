// import useState hook to create a coupons state for the response, maxPriceModalState, categoryModalState, 
// filterState and loading states
// import useEffect hook, which runs just in the first time the render is committed to the screen, 
// to fetch all the company coupons
import React, { useEffect, useState } from 'react';

// import CompanyService class which implements Api.js to get data for the filters in this page and to get all coupons from the DB
import CompanyService from '../../../share/service/CompanyService';

// import CompanyHandledCouponCard component to show card view with update/ delete options
import CompanyManagementCouponCard from '../../../share/ui/cards/coupon_cards/CompanyManagementCouponCard';

// import MaxPriceModalForm and CategoryModalForm for a display of coupons by a specific criterion
import MaxPriceModalForm from '../../../share/ui/forms/filter_modals/MaxPriceModalForm';
import CategoryModalForm from '../../../share/ui/forms/filter_modals/CategoryModalForm';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// if there are no coupons from a category or up to the price that sent on the modal form 
import { setMessage } from '../../../store/actions/ReducerActions';

// import Container, Row and Col from react-bootstrap for styling of the cards position on the page 
import { Container, Row, Col } from 'react-bootstrap';

// import sortByString from SortUtil.js to sort the cards alphabetically
import { sortByString } from '../../../share/ui/SortUtil';

// import our custom css 
import '../../../styles/CouponCard.css';

const AllCoupons = () => {

    const [coupons, setCoupons] = useState([]);
    const [maxPriceModalState, setMaxPriceModalState] = useState(false);
    const [categoryModalState, setCategoryModalState] = useState(false);
    const [filterState, setFilterState] = useState();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    //  returns company coupons by category
    const onFilterByCategory = async (category) => {
        setLoading(true);
        // console.log('AllCoupons.js/onFilterByCategory/category: ', category);
        await new CompanyService(dispatch)
            .getCouponsByCategory(category.id)
            .then(response => {
                if (response.succeeded) {
                    console.log('AllCoupons.js/onFilterByCategory/response: ', response.coupons);
                    setCoupons(response.coupons.sort((a, b) => sortByString(a.title, b.title)));
                    setFilterState(`filtered by the category ${category.name}`);
                    if (response.coupons.length < 1) {
                        dispatch(setMessage(`You don't have coupons from the category ${category.name}`));
                    };
                } else {
                    console.log('AllCoupons.js/onFilterByCategory/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllCoupons.js/onFilterByCategory/err: ', err);
            });
        setLoading(false);
    };

    //  returns company coupons by maximum price
    const onFilterByMaxPrice = async (maxPrice) => {
        setLoading(true);
        // console.log('AllCoupons.js/onFilterByMaxPrice/maxPrice: ', maxPrice);
        await new CompanyService(dispatch)
            .getCouponsByMaxPrice(maxPrice)
            .then(response => {
                if (response.succeeded) {
                    console.log('AllCoupons.js/onFilterByMaxPrice/response: ', response.coupons);
                    setCoupons(response.coupons.sort((a, b) => sortByString(a.title, b.title)));
                    setFilterState(`filtered by price up to ${maxPrice} NIS`)
                    if (response.coupons.length < 1) {
                        dispatch(setMessage(` You don't have coupons that are priced up to ${maxPrice} NIS`));
                    };
                } else {
                    console.log('AllCoupons.js/onFilterByMaxPrice/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllCoupons.js/onFilterByMaxPrice/err: ', err);
            });
        setLoading(false);
    };

    //  returns all company coupons 
    async function fetchAllCoupons() {
        setLoading(true);
        await new CompanyService(dispatch)
            .getAllCoupons()
            .then(response => {
                if (response.succeeded) {
                    console.log('AllCoupons.js/fetchAllCoupons/response: ', response.coupons);
                    setCoupons(response.coupons.sort((a, b) => sortByString(a.title, b.title)));
                    setFilterState('');
                } else {
                    console.log('AllCoupons.js/fetchAllCoupons/response: ', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('AllCoupons.js/fetchAllCoupons/err: ', err);
            });
        setLoading(false);
    };

    // this useEffect hook runs once on mount and fetches all company coupons API data
    useEffect(() => {
        fetchAllCoupons();
    }, []
    );

    // displays 'loading...' while data uploads
    if (loading) {
        return (
            <div className='loading' >loading...</div>
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
                    onClick={fetchAllCoupons}
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
            {!coupons || coupons.length < 1 ?
                //  returns a background image of zero if no coupons were found for the filter 
                <div className='no_coupons' />
                :
                <Container>
                    <Row>
                        {(coupons.map(coupon =>
                            <Col xs={4}
                                key={coupon.id}
                            >
                                <CompanyManagementCouponCard
                                    coupon={coupon}
                                    onFinishDelete={fetchAllCoupons}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            }
        </div>
    );
};

export default AllCoupons;