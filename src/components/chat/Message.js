import React from 'react';
import { connect } from 'react-redux';
import './styles/message.css';

const Message = ({ message: { text, user, date, type }, id }) => {
	let isSentByCurrentUser = false;
	let toDate = new Date(date).toLocaleString();
	if (id === user.id && type === 'text') {
		return (
			<div className='messageContainer justifyEnd'>
				<p className='sentText pr-10'>
					{user.nickName}
					{toDate}
				</p>
				<div className='messageBox backgroundBlue'>
					<p className='messageText colorWhite'>{text}</p>
				</div>
			</div>
		);
	} else if (id === user.id && type === 'gif') {
		return (
			<div className='messageContainer justifyEnd'>
				<p className='sentText pr-10'>
					{user.nickName}
					{toDate}
				</p>
				<div className='messageBox backgroundBlue'>
					<img src={text} />
				</div>
			</div>
		);
	} else if (id !== user.id && type === 'gif') {
		return (
			<div className='messageContainer justifyStart'>
				<div className='messageBox backgroundLight'>
					<img src={text} />
				</div>
				<p className='sentText pl-10 '>
					{user.nickName} {toDate}{' '}
				</p>
			</div>
		);
	} else {
		return (
			<div className='messageContainer justifyStart'>
				<div className='messageBox backgroundLight'>
					<p className='messageText colorDark'>{text}</p>
				</div>
				<p className='sentText pl-10 '>
					{user.nickName} {toDate}{' '}
				</p>
			</div>
		);
	}
};
const mapStateToProps = (reducers) => {
	return reducers.appReducer;
};
export default connect(mapStateToProps)(Message);
