// import useState hook to create query, images, message and isModalOpen states
import React, { useState } from 'react';

// import Form and InputGroup from react-bootstrap to create our ImageSelector that will be added to the CouponForm 
import { Form, InputGroup } from 'react-bootstrap';

// import createApi from unsplash-js to use its image collection in CouponForm Component
import { createApi } from 'unsplash-js';

// import ImageModalForm to handle the image collection view and selection
import ImageModalForm from './ImageModalForm';

// import icons from react icons
import { MdPageview } from 'react-icons/md';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import our custom css 
import '../../../../styles/ImageSelector.css';

const unsplash = createApi({
    // my access token from Unsplash Developer
    accessKey:
        "RNIakx1UuCHnH6QS6DLvIsaGP-QluG3sgpvswRjzfxA",
});

const path = process.env.PUBLIC_URL;
const directory = '/assets/img/coupons/';

const ImageDropdownSelector = (props) => {

    const [query, setQuery] = useState('');
    const [images, setImages] = useState();
    const [message, setMessage] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSelectImage = (image) => {
        props.onSelectImage(image.urls.small);
        console.log(image);
        setMessage('');
    };

    // this function receives an event of the user query input, set a message to display to the user 
    // in case that a query is not typed and set the query state to the received value
    const handleQueryChange = (event) => {
        props.onChange(event);
        if (event.target.value) {
            setMessage('');
        } else {
            setMessage('Cannot search without a query');
        }
        setQuery(event.target.value);
    };

    // this function, in case there is a query, provides a collection of twelve images from unsplash Api 
    // according to the query and sets the images state to the search result, and the modal state to be open
    const onClickSearchImage = (event) => {
        // if the event does not get explicitly handled, its default action should not be taken as it normally would be
        event.preventDefault();
        if (!query) {
            setMessage('Cannot search without a query');
        } else {
            unsplash.search.getPhotos({
                query: query,
                page: 1,
                perPage: 12,
            }).then(data => {
                console.log('ImageDropdownSelector.js/onClickSearchImage/images: ', data);
                if (data?.response?.results) {
                    setImages(data.response.results);
                    setIsModalOpen(true);
                };
            });
        };
    };

    return (
        <Form.Group>
            <ImageModalForm
                // is set to false in ImageModalForm.js/hideModal function that is used when x button is clicked
                setIsOpen={setIsModalOpen}
                // in use in show property in ImageModalForm.js/Modal tab
                isOpen={isModalOpen}
                onImageSelected={onSelectImage}
                images={images}
            />
            <Form.Label>
                Choose an Image
            </Form.Label>
            <InputGroup>
                <Form.Control
                    aria-label='Floating label select example'
                    value={query}
                    onChange={handleQueryChange}
                    isInvalid={!!message || !!props.error}
                    placeholder="Enter a query. For example: 'gym'."
                >
                </Form.Control>
                <MDBBtn
                    className='image-query_btn'
                    noRipple='true'
                    outline='true'
                    color='none'
                    onClick={onClickSearchImage}
                >
                    {<MdPageview />}
                </MDBBtn>
                <Form.Control.Feedback type='invalid'>
                    {message ?? props.error}
                </Form.Control.Feedback>
            </InputGroup>
            {props.value &&
                <img
                    className='selected_image'
                    src={props.value.includes('http')
                        ?
                        props.value
                        :
                        path + directory + props.value}
                    alt={props.alt}
                />
            }
        </Form.Group>
    );
};

export default ImageDropdownSelector;
