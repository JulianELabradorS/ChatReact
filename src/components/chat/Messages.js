import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

import './styles/messages.css';

const Messages = ({ messages, record }) => {
	return (
		<ScrollToBottom className='messages__container'>
			{record.map((message, i) => (
				<div key={i}>
					<Message message={message} />
				</div>
			))}
			{messages.map((message, i) => (
				<div key={i}>
					<Message message={message} />
				</div>
			))}
		</ScrollToBottom>
	);
};

export default Messages;
