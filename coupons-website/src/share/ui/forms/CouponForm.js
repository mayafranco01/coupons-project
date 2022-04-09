// import useState hook to create an initial coupon state that will send to its parent Component,
// a categories state to set inside all categories from the DB and an array of error objects 
// that are displayed to the user if values are empty or invalid 

// import useEffect hook, that runs in the first time the render is committed to the screen, to fetch all categories 
// for category dropdown selector, another useEffect to fetch the company details to insert the company name in the form
// and in addition, useEffect that runs in the first time the render is committed to the screen and on any time 
// the defaultCoupon value changes and is used for getting the coupon's data for editing in case of an update coupon request
import React, { useState, useEffect } from 'react';

// import Form and FormControl from react-bootstrap to create a coupon add/ update form
import { Form, FormControl } from 'react-bootstrap';

// import CategoryService Class which implements CategoryApi.js to get all the categories for the dropdown selector
import CategoryService from '../../service/CategoryService';

// import CompanyService Class which implements Api.js to get company details to insert in the form
import CompanyService from '../../service/CompanyService';

// import Coupon Class from model
import Coupon from '../../model/core.coupon';

// import ImageSelector to get images from unsplash
import ImageSelector from './coupons_images/ImageSelector';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions to send a message inside an AlertMessage to the user 
// in case of unhanded errors which will be caught by the server
import { setMessage } from '../../../store/actions/ReducerActions';

// import our custom css 
import '../../../styles/Form.css';

// this Component receives a defaultCoupon prop in case of update coupon, onSubmit that calls the Service 
// according to the use of the form (add or update coupon), and titleDisabled prop that in case of update, is true
// because there is no permission to change an existing coupon title, and in case of an addition of a new coupon, is false
const CouponForm = ({ defaultCoupon, onSubmit, titleDisabled }) => {

    const [coupon, setCoupon] = useState(defaultCoupon ?? new Coupon());
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        new CategoryService(dispatch)
            .getCategories()
            .then(response => {
                if (response.succeeded) {
                    setCategories(response.categories);
                } else {
                    dispatch(setMessage(response.errorMessage));
                };
            })
            .catch(err => {
                console.log('CouponForm.js/useEffect/err: ', err);
            }
            );
    }, []
    );

    useEffect(() => {
        console.log('CouponForm.js/useEffect/defaultCoupon: ', defaultCoupon);
        if (defaultCoupon) {
            setCoupon({ ...defaultCoupon, category: defaultCoupon.category.id });
        };
    }, [defaultCoupon]
    );

    useEffect(() => {
        async function fetchCompany() {
            new CompanyService(dispatch)
                .getCompanyDetails()
                .then(response => {
                    console.log('CouponForm.js/useEffect/fetchCompany/response: ', response);
                    if (response.succeeded) {
                        let receivedCompany = response.company;
                        setCoupon({ ...coupon, company: receivedCompany });
                    } else {
                        dispatch(setMessage(response.errorMessage));
                    };
                })
                .catch(err => {
                    console.log('CouponForm.js/useEffect/fetchCompany/err: ', err);
                    dispatch(setMessage(err.errorMessage));
                });
        };
        fetchCompany();
    }, []
    );

    // create custom functions that initialize the coupon values
    const handleTitleChange = (event) => {
        const title = event.target.value;
        if (title) {
            setErrors({ ...errors, titleError: '' });
        } else {
            setErrors({ ...errors, titleError: 'Please enter a title' });
        };
        setCoupon({ ...coupon, title });
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (category) {
            setErrors({ ...errors, categoryError: '' });
        } else {
            setErrors({ ...errors, categoryError: 'Please choose a category' });
        }
        setCoupon({ ...coupon, category });
    };

    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        if (description) {
            setErrors({ ...errors, descriptionError: '' });
        } else {
            setErrors({ ...errors, descriptionError: 'Please enter a description' });
        };
        setCoupon({ ...coupon, description });
    };

    const handleStartDateChange = (event) => {
        const startDate = event.target.value;
        if (startDate) {
            setErrors({ ...errors, startDateError: '' });
        } else {
            setErrors({ ...errors, startDateError: 'Please select a start date' });
        };
        setCoupon({ ...coupon, startDate });
    };

    const handleEndDateChange = (event) => {
        const endDate = event.target.value;
        if (endDate) {
            setErrors({ ...errors, endDateError: '' });
        } else {
            setErrors({ ...errors, endDateError: 'Please select end date' });
        };
        setCoupon({ ...coupon, endDate });
    };

    const handleAmountChange = (event) => {
        const amount = event.target.value;
        if (amount) {
            setErrors({ ...errors, amountError: '' });
        } else {
            setErrors({ ...errors, amountError: 'Please choose an amount' });
        };
        setCoupon({ ...coupon, amount });

    };

    const handlePriceChange = (event) => {
        const price = event.target.value;
        if (price) {
            setErrors({ ...errors, priceError: '' });
        } else {
            setErrors({ ...errors, priceError: 'Please choose a price' });
        };
        setCoupon({ ...coupon, price });
    };

    const handleImageChange = (event) => {
        const image = event.target.value;
        if (image) {
            setErrors({ ...errors, imageError: '' });
        } else {
            setErrors({ ...errors, imageError: 'Please select an image' });
        };
    };

    const onSelectImage = (image) => {
        setCoupon({ ...coupon, image });
    };

    const formValidation = () => {
        const newErrors = {};
        if (!coupon.title) newErrors.titleError = 'Please enter a title';
        if (!coupon.description) newErrors.descriptionError = 'Please enter a description';
        if (!coupon.category) newErrors.categoryError = 'Please choose a category';
        if (!coupon.startDate) newErrors.startDateError = 'Please select a start date';
        if (!coupon.endDate) newErrors.endDateError = 'Please select end date';
        if (!coupon.amount) newErrors.amountError = 'Please choose amount';
        if (!coupon.price) newErrors.priceError = 'Please choose price';
        if (!coupon.image) newErrors.imageError = 'Please select an image';
        return newErrors;
    };

    // create a custom function that will send the coupon details  
    const handleOnSubmit = (event) => {
        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();
        console.log(`CouponForm.js/handleOnSubmit/event: ${event}, coupon: ${coupon}`);
        const newErrors = formValidation();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit(coupon);
        }
    };

    return (
        <div>
            <Form
                className='form coupon_form'
                onSubmit={handleOnSubmit}
            >
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Title
                    </Form.Label>
                    <Form.Control
                        disabled={titleDisabled}
                        type='text'
                        value={coupon.title}
                        placeholder='Enter title'
                        onChange={handleTitleChange}
                        isInvalid={!!errors.titleError}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                        {errors.titleError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label
                    >
                        Company
                    </Form.Label>
                    <Form.Control
                        type='text'
                        value={coupon?.company?.name ?? ''}
                        disabled={true}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Category
                    </Form.Label>
                    <Form.Select
                        isInvalid={!!errors.categoryError}
                        aria-label='Floating label select example'
                        value={coupon.category}
                        onChange={handleCategoryChange}>
                        <option>Select category</option>
                        {categories.map(category =>
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {errors.categoryError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label
                    >
                        Coupon Description
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={5}
                        value={coupon.description}
                        placeholder='Enter description'
                        onChange={handleDescriptionChange}
                        isInvalid={!!errors.descriptionError}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                        {errors.descriptionError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Choose Start Date
                    </Form.Label>
                    <FormControl
                        value={coupon.startDate}
                        type='date'
                        title='Start date'
                        onChange={handleStartDateChange}
                        isInvalid={!!errors.startDateError}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.startDateError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Choose End Date
                    </Form.Label>
                    <FormControl
                        value={coupon.endDate}
                        type='date'
                        title='End date'
                        onChange={handleEndDateChange}
                        isInvalid={!!errors.endDateError}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.endDateError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Amount
                    </Form.Label>
                    <Form.Control
                        value={coupon.amount}
                        type='number'
                        min='1'
                        title='Amount'
                        onChange={handleAmountChange}
                        isInvalid={!!errors.amountError}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.amountError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Price
                    </Form.Label>
                    <Form.Control
                        value={coupon.price}
                        type='number'
                        min='1'
                        title='Price'
                        onChange={handlePriceChange}
                        isInvalid={!!errors.priceError}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.priceError}
                    </Form.Control.Feedback>
                </Form.Group>
                <ImageSelector
                    alt={coupon?.title}
                    value={coupon?.image}
                    onSelectImage={onSelectImage}
                    error={errors.imageError}
                    onChange={handleImageChange}
                >
                </ImageSelector>
                <MDBBtn
                    className='form_btn'
                    type='submit'
                    color='none'
                    noRipple='true'
                    size='sm'
                    floating='true'
                >
                    Send
                </MDBBtn>
            </Form>
        </div >
    );
};

export default CouponForm;