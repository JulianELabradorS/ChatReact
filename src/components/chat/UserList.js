import React from 'react';
import './styles/userList.css';

const UserList = (props) => {
	return (
		<div className='users'>
			<h1 className='users__title'>Connected</h1>
			<ul>
				{props.UserList.map((user) => {
					return (
						<li key={user.id}>
							<span className='icon-conected'></span>
							{user.nickName}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default UserList;
