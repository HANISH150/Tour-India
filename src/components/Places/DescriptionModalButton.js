import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function DescriptionModalButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" className='place-text' onClick={handleShow}>
        DESCRIPTION
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='place-text'>{props.place}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img className='w-100'style={{borderRadius:8}} src={props.image} alt="IMAGE NOT FOUND!!" />
            <p className='place-text text-center m-4'>{props.overview}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" className='place-text' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default DescriptionModalButton
