import axios from 'axios';
import updateAuthorizationHeader from '../service/AuthenticatedApiService';

axios.defaults.baseURL = 'http://localhost:8080';

export default {

    updateAuthorizationHeader,

    admin() {
        return {
            login: (email, password) => axios.post(`/coupons/login/admin`, { email, password }),
            addCompany: (company) => axios.post(`/coupons/admin/company/add`, company),
            updateCompany: (company) => axios.put(`/coupons/admin/company/update`, company),
            deleteCompany: (id) => axios.delete(`/coupons/admin/company/delete`, { data: { id } }),
            getOneCompany: (id) => axios.post(`/coupons/admin/company`, { id }),
            getAllCompanies: () => axios.get(`/coupons/admin/companies`),
            addCustomer: (customer) => axios.post(`/coupons/admin/customer/add`, customer),
            updateCustomer: (customer) => axios.put(`/coupons/admin/customer/update`, customer),
            deleteCustomer: (id) => axios.delete(`/coupons/admin/customer/delete`, { data: { id } }),
            getOneCustomer: (id) => axios.post(`/coupons/admin/customer`, { id }),
            getAllCustomers: () => axios.get(`/coupons/admin/customers`),
            getCompanyCoupons: (id) => axios.post(`/coupons/admin/company/coupons`, { id }),
            getCustomerCoupons: (id) => axios.post(`/coupons/admin/customer/coupons`, { id })
        };
    },

    company() {
        return {
            login: (email, password) => axios.post(`/coupons/login/company`, { email, password }),
            addCoupon: (coupon) => axios.post(`/coupons/company/coupon/add`, coupon),
            updateCoupon: (coupon) => axios.put(`/coupons/company/coupon/update`, coupon),
            deleteCoupon: (id) => axios.delete(`/coupons/company/coupon/delete`, { data: { id } }),
            getAllCoupons: () => axios.get(`/coupons/company/coupons`),
            getCouponsByCategory: (category) => axios.post(`/coupons/company/coupons/category`, { id: category }),
            getCouponsByMaxPrice: (maxPrice) => axios.post(`/coupons/company/coupons/maxPrice`, { maxPrice }),
            getCompanyDetails: () => axios.get(`/coupons/company/details`),
            getOneCoupon: (id) => axios.post(`/coupons/company/coupon`, { id }),
        };
    },

    customer() {
        return {
            login: (email, password) => axios.post(`/coupons/login/customer`, { email, password }),
            purchaseCoupon: (coupon) => axios.put(`/coupons/customer/purchase`, coupon),
            getCustomerCoupons: () => axios.get(`/coupons/customer/coupons`),
            getCustomerCouponsByCategory: (category) => axios.post(`/coupons/customer/coupons/category`, { id: category }),
            getCustomerCouponsByMaxPrice: (maxPrice) => axios.post(`/coupons/customer/coupons/maxPrice`, { maxPrice }),
            getCustomerDetails: () => axios.get(`/coupons/customer/details`)
        };
    }
};

updateAuthorizationHeader();
