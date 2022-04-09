import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default {

    category() {
        return {
            getCategories: () => axios.get(`/coupons/categories`),
            getCouponsByCategory: (category) => axios.post(`/coupons/category/coupons`, { id: category })
        };
    }
};
