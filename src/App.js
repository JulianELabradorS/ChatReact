import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login/Login';
import ChatRoom from './components/chat/ChatRoom';
import SignUp from './components/singup/SignUp';
const App = () => (
	<Router>
		<Route path='/' exact component={Login}></Route>
		<Route path='/chatroom/1' component={ChatRoom}></Route>
		<Route path='/signup' component={SignUp}></Route>
	</Router>
);

export default App;
