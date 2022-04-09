import React from 'react';

// import Modal from react-bootstrap to create this image modal form
import { Modal } from 'react-bootstrap';

// import MDB custom button styles from mdb-react-ui-kit
import { MDBBtn } from 'mdb-react-ui-kit';

// import our custom css 
import '../../../../styles/ImageSelector.css';

const ImageModalForm = (props) => {

    const hideModal = () => {
        props.setIsOpen(false);
    };

    const onClickImage = (image) => {
        props.onImageSelected(image);
        hideModal();
    };

    return (
        <Modal
            show={props.isOpen}
            onHide={hideModal}
        >
            <Modal.Header>
                <Modal.Title>
                    Images
                </Modal.Title>
                <MDBBtn
                    className='image-close_btn'
                    color='none'
                    size='lg'
                    noRipple='true'
                    floating='true'
                    onClick={() => hideModal()}
                >
                    x
                </MDBBtn>
            </Modal.Header>
            <Modal.Body>
                {props.images && (props.images.map(image =>
                    <img
                        className='image_selector-image'
                        key={image.id} 
                        onClick={() => onClickImage(image)}
                        src={image.urls.thumb}
                        alt={image.alt_description}
                    >
                    </img>
                ))}
            </Modal.Body>
        </Modal>

    );
};

export default ImageModalForm;