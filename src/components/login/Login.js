import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = (props) => {
	const [nickName, setNickName] = useState('');
	const [password, setPassword] = useState('');
	const [alert, setAlert] = useState('');
	let history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!nickName || !password) {
			setAlert('Por favor llene todos los campos');
		} else {
			setAlert('');
			fetch('https://chat-prueba-red.herokuapp.com/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ nickName: nickName, password: password }),
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						window.sessionStorage.setItem('token', data.token);
						history.push('/chatroom/1');
					});
				} else if (response.status === 401) {
					setAlert('Usuario o contraseña incorrectos');
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
					<Form
						className='mb-3'
						onSubmit={(e) => {
							handleSubmit(e);
						}}>
						<Form.Group controlId='nickname'>
							<Form.Label>Nickname</Form.Label>
							<Form.Control
								type='text'
								onChange={(e) => {
									setNickName(e.target.value);
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
							Entrar
						</Button>
					</Form>
					<Link to='/signup'>Registrate</Link>
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

export default Login;
