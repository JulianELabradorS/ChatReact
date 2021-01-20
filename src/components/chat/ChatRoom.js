import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
//COMPONENTS
import Input from './input';
import UserList from './UserList';
import Messages from './Messages';
//STYLES
import './styles/chatRoom.css';
//Actions
import * as appActions from '../../actions/appActions';
let socket;
const ChatRoom = (props) => {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [users, setUsers] = useState([]);
	const [record, setRecord] = useState([]);

	let history = useHistory();
	const ENDPOINT = 'https://chat-prueba-red.herokuapp.com';
	const token = window.sessionStorage.getItem('token');
	let user = jwt.decode(token);

	useEffect(() => {
		socket = io(ENDPOINT, {
			query: { token: token },
		});
		if (token) {
			socket.emit('join', { user: user });
			props.saveUser(user);
			socket.on('getHistory', (data) => {
				setRecord(data);
			});
		} else {
			history.push('/');
		}
		return () => {
			socket.disconnect();
		};
	}, [ENDPOINT]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [...messages, message]);
		});
	}, []);

	useEffect(() => {
		socket.on('updateList', ({ users }) => {
			setUsers(users);
		});
	}, [users]);

	const sendMessage = (e) => {
		e.preventDefault();

		if (message) {
			socket.emit('sendMessage', { text: message, user: user, type: 'text' }, () => setMessage(''));
		}
	};
	const gifClick = (url) => {
		socket.emit('sendMessage', { text: url, user: user, type: 'gif' }, () => setMessage(''));
	};

	return (
		<div className='container'>
			<div className='chat row'>
				<div className='col-md-8 chat-text'>
					<Messages messages={messages} record={record}></Messages>
					<Input message={message} setMessage={setMessage} sendMessage={sendMessage} gifClick={gifClick} />
				</div>
				<div className='col-md-4'>
					<UserList UserList={users} />
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (reducers) => {
	return reducers.appReducer;
};

export default connect(mapStateToProps, appActions)(ChatRoom);
