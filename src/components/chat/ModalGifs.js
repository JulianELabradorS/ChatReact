import React from 'react';

import { Modal, Row, Col } from 'react-bootstrap';

const ModalGifs = (props) => {
	return (
		<Modal
			size='lg'
			show={props.show}
			onHide={() => props.setShow(false)}
			aria-labelledby='example-modal-sizes-title-lg'>
			<Modal.Header closeButton>
				<Modal.Title id='example-modal-sizes-title-lg'>Gifs</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					{props.gifs.map((gif) => {
						return (
							<Col key={gif.id} md='3' className='mb-3'>
								<img
									className='w-100 h-100'
									src={gif.images.preview_gif.url}
									onClick={(e) => props.gifClick(e.target.src, props.setShow)}></img>
							</Col>
						);
					})}
				</Row>
			</Modal.Body>
		</Modal>
	);
};

export default ModalGifs;
