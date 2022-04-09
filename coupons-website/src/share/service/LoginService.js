// import Api - axios HTTP communication handler
import Api from '../api/Api';

class LoginService {

    clientApi = (clientType) => {
        switch (clientType) {
            case 'admin':
                return Api.admin();
            case 'company':
                return Api.company();
            case 'customer':
                return Api.customer();
            default:
                return undefined;
        };
    };

    login = async (email, password, clientType) => {
        try {
            const clientApi = this.clientApi(clientType);
            if (!clientApi) {
                return { isLogin: false };
            };
            const response = await clientApi.login(email, password);
            // console.log('LoginService.js/login/response: ', response);
            localStorage.setItem('jwtToken', response.data.jwtToken);
            return { isLogin: true, id: response.data.id, expiration: response.data.expiration };
        } catch (err) {
            if (err.response?.data) {
                console.log('LoginService.js/login/err: ', err.response.data.message);
            } else {
                console.log('LoginService.js/login/err: ', err.message);
            };
            return { isLogin: false };
        };
    };
};

export default LoginService;
