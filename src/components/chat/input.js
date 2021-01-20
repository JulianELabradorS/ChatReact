import React, { useState } from 'react';
import Modal from './ModalGifs';
import './styles/input.css';

const Input = (props) => {
	const [show, setShow] = useState(false);
	const [gifs, setGifs] = useState([]);
	const getGifs = (e) => {
		props.setMessage('');
		fetch('https://api.giphy.com/v1/gifs/trending?api_key=bHQ3e4OvEpB1yAOqNWp84iaTQW3HQH4R&limit=12&rating=g').then(
			(response) => {
				response.json().then((data) => {
					setShow(true);
					setGifs(data.data);
				});
			}
		);
	};
	return (
		<div className='row'>
			<input
				value={props.message}
				className='col-9 form-control'
				onChange={(e) => (e.target.value !== '/giphy' ? props.setMessage(e.target.value) : getGifs(e))}
				onKeyPress={(e) => (e.key === 'Enter' ? props.sendMessage(e) : null)}
			/>
			<button
				className='col-3 btn-primary btn'
				onClick={(e) => {
					props.sendMessage(e);
				}}>
				Enviar
			</button>
			<Modal show={show} setShow={setShow} gifs={gifs} gifClick={props.gifClick}></Modal>
		</div>
	);
};
export default Input;
