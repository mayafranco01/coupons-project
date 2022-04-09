import axios from 'axios';

const updateAuthorizationHeader = () => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
		'jwtToken'
	)}`;
};

export default updateAuthorizationHeader;
