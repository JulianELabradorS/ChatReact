import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
	const [password, setPassword] = useState('');
	const [nickName, setNickName] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [alert, setAlert] = useState('');
	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!nickName || !password || !lastName || !firstName) {
			setAlert('Por favor llene todos los campos');
		} else {
			setAlert('');
			fetch('https://chat-prueba-red.herokuapp.com/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ nickName: nickName, password: password, lastName: lastName, firstName: firstName }),
			}).then((response) => {
				if (response.status === 200) {
					history.push('/');
				} else if (response.status === 400) {
					setAlert('Nickname ya registrado');
				} else {
					setAlert('Tenemos problemas en nuestros Servidores intente de nuevo mas tarde');
				}
			});
		}
	};
	return (
		<Container fluid='md' className='justify-content-md-center pt-5'>
			<Row className='justify-content-md-center'>
				<Col lg='6'>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group controlId='nickname'>
							<Form.Label>Nickname</Form.Label>
							<Form.Control
								type='text'
								onChange={(e) => {
									setNickName(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId='firstName'>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type='text'
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId='lastName'>
							<Form.Label>Apellido</Form.Label>
							<Form.Control
								type='text'
								onChange={(e) => {
									setLastName(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type='password'
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>
							Crear Usuario
						</Button>
					</Form>
				</Col>
			</Row>
			<Row className='justify-content-md-center mt-3'>
				{alert ? (
					<Col lg='6'>
						<Alert variant='danger'>{alert}</Alert>
					</Col>
				) : null}
			</Row>
		</Container>
	);
};
export default SignUp;
