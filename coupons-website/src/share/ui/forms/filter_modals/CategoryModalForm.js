// import useState hook to create a categories state to set the categories from the DB
// import useEffect hook to fetching all categories
import React, { useState, useEffect } from 'react';

// import Form and Button from react-bootstrap to create a company add/ update form
import { Form, Modal } from 'react-bootstrap';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import CategoryService Class that implements Api.js to get all the categories from the DB
import CategoryService from '../../../service/CategoryService';

// import useFormik hook that will return all formik state and helpers directly
import { useFormik } from 'formik';

// import Yup API for formik validation schema
import * as Yup from 'yup';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

const CategoryModalForm = (props) => {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);

    // create initial validation schema using Yup Api that receives form data values and validates each property 
    // based on the rules defined
    const validationSchema = Yup.object().shape({
        category: Yup.string()
            .required('Choose a category'),
    });

    // formik uses useFormik hook to initialize the category value
    const formik = useFormik({
        initialValues: {
            category: ''
        },
        // all field-level validations are run at the beginning of a submission attempt and then 
        // the results are deeply merged with any top-level validation results
        validationSchema,
        onSubmit: (data) => {
            // JSON.stringify converts a js value to a json object string (value, replacer, space): 
            // value: the user input will convert to a JSON string, 
            // replacer: if the replacer is null all properties of the object are included in the resulting JSON string, 
            // space: inserts 2 white space into the output JSON string for readability purposes
            console.log(JSON.stringify(data, null, 2));
        },
    });

    useEffect(() => {
        new CategoryService(dispatch)
            .getCategories()
            .then(response => {
                if (response.succeeded) {
                    console.log('CategoryModalForm.js/useEffect/response:', response);
                    setCategories(response.categories);
                } else {
                    console.log('CategoryModalForm.js/useEffect/response:', response.errorMessage);
                };
            })
            .catch(err => {
                console.log('CategoryModalForm.js/useEffect/err:', err);
            });
    }, []
    );

    // this handleReset function resets the form values
    const handleReset = () => {
        formik.setValues({ category: '' });
    };

    const handleCategoryChange = (event) => {
        console.log('CategoryModalForm.js/handleCategoryChange/event: ', event);
        formik.setFieldValue('category', event.target.value);
    };

    // this custom function receives event of the category value 
    // to send it to AllCoupons/ AllPurchases Component and hide the modal form
    const handleSubmitForm = (event) => {

        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();

        // getting user input category value into a variable
        let category = formik.values.category;
        
        const selectedCategory = categories.find(element => {
            return element.id === Number(category)
        });
        props.onSubmit(selectedCategory);
        hideModal();
    };

    const hideModal = () => {
        props.setIsOpen(false);
    };

    return (
        <Modal
            show={props.isOpen}
            onHide={hideModal}
        >
            <Modal.Header>
                <Modal.Title>
                    Coupons By Category
                </Modal.Title>
                <MDBBtn
                    outline='true'
                    color='secondary'
                    size='sm'
                    noRipple='true'
                    floating='true'
                    onClick={() => hideModal()}
                >
                    Close
                </MDBBtn>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3'>
                    <Form.Select
                        name='category'
                        type='text'
                        aria-label='Floating label select example'
                        value={formik.values.category}
                        onChange={(e) => {
                            handleCategoryChange(e);
                        }}
                    >
                        <option>Select category</option>
                        {categories && (categories.map(category =>
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <div className='text-danger'>
                        {formik.errors.category
                            ?
                            formik.errors.category
                            :
                            null
                        }
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <MDBBtn
                    outline='true'
                    type='reset'
                    color='dark'
                    noRipple='true'
                    size='sm'
                    floating='true'
                    onClick={handleReset}
                >
                    Reset
                </MDBBtn>
                <MDBBtn
                    outline='true'
                    color='info'
                    size='sm'
                    noRipple='true'
                    floating='true'
                    onClick={handleSubmitForm}
                    disabled={(
                        formik.values.category === 'Select category'
                    )}
                >
                    Send
                </MDBBtn>
            </Modal.Footer>
        </Modal>

    );
};

export default CategoryModalForm;