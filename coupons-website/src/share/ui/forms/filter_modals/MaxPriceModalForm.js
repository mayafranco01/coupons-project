import React from 'react';

// import Form and Modal from react-bootstrap to create this modal form
import { Form, Modal } from 'react-bootstrap';

// import useFormik hook that will return all formik state and helpers directly
import { useFormik } from 'formik';

// import Yup API for formik validation schema
import * as Yup from 'yup';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

const MaxPriceModalForm = (props) => {

    // create initial validation schema using Yup Api that receives form data values and validates each property 
    // based on the rules defined
    const validationSchema = Yup.object().shape({
        maxPrice: Yup.number()
            .required('Choose maximum price')
            .positive('The number should be more than 0')
            .max(100000, 'The number should be up to 100000')
    });

    // formik uses useFormik hook to initialize the maxPrice value
    const formik = useFormik({
        initialValues: {
            maxPrice: 0.0
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

    // this handleReset function resets the form values
    const handleReset = () => {
        formik.setValues({ maxPrice: '' });
    };

    // this custom function receives event of the maxPrice value 
    // to send it to AllCoupons/ AllPurchases Component and hide the modal form
    const handleSubmitForm = (event) => {

        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();

        // console.log(formik.isValid)
        if (formik.isValid) {
            // getting user input maxPrice value into a variable
            let maxPrice = formik.values.maxPrice;

            props.onSubmit(maxPrice);
            hideModal();
        };
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
                    Coupons By Maximum Price
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
                    <Form.Label>
                        Maximum Price:
                    </Form.Label>
                    <Form.Control
                        name='maxPrice'
                        type='number'
                        min='1'
                        max='100000'
                        value={formik.values.maxPrice}
                        onChange={(e) => formik.handleChange(e)}
                    />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                    <div className='text-danger'>
                        {formik.errors.maxPrice
                            ?
                            formik.errors.maxPrice
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
                        formik.values.maxPrice === ''
                    )}
                >
                    Send
                </MDBBtn>
            </Modal.Footer>
        </Modal>

    );
};

export default MaxPriceModalForm;