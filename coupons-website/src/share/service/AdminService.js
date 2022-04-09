// import Api - axios HTTP communication handler
import Api from '../api/Api';

// import Company, Customer and Coupon object model classes
import Company from '../model/core.company';
import Customer from '../model/core.customer';
import Coupon from '../model/core.coupon';

// import CatchErrors Component
import CatchErrors from './CatchErrors';

class AdminService {

    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    };

    getAllCompanies = async () => {
        console.log('AdminService.js/getAllCompanies');
        return Api.admin().getAllCompanies()
            .then(response => {
                console.log('AdminService.js/getAllCompanies/response: ', response);
                const companies = response.data.map(company =>
                    new Company(
                        company.id,
                        company.name,
                        company.email,
                        company.password
                        ));
                return { succeeded: true, companies };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getOneCompany = async (id) => {
        console.log('AdminService.js/getOneCompany');
        return Api.admin().getOneCompany(id)
            .then(response => {
                console.log('AdminService.js/getOneCompany/response: ', response);
                const company = response.data;
                return { succeeded: true, company };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    addCompany = async (company) => {
        console.log('AdminService.js/addCompany');
        return Api.admin().addCompany(company)
            .then(response => {
                console.log('AdminService.js/addCompany/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    updateCompany = async (updatedCompany) => {
        console.log('AdminService.js/updateCompany');
        return Api.admin().updateCompany(updatedCompany)
            .then(response => {
                console.log('AdminService.js/updateCompany/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    deleteCompany = async (id) => {
        console.log('AdminService.js/deleteCompany/id', id);
        return Api.admin().deleteCompany(id)
            .then(response => {
                console.log('AdminService.js/deleteCompany/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getAllCustomers = async () => {
        console.log('AdminService.js/getAllCustomers');
        return Api.admin().getAllCustomers()
            .then(response => {
                console.log('AdminService.js/getAllCustomers/response: ', response);
                const customers = response.data.map(customer =>
                    new Customer(
                        customer.id,
                        customer.firstName,
                        customer.lastName,
                        customer.email,
                        customer.password
                    ));
                return { succeeded: true, customers };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getOneCustomer = async (id) => {
        console.log('AdminService.js/getOneCustomer');
        return Api.admin().getOneCustomer(id)
            .then(response => {
                console.log('AdminService/ getOneCustomer/ response: ', response);
                const customer = response.data;
                return { succeeded: true, customer };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    addCustomer = async (customer) => {
        console.log('AdminService.js/addCustomer');
        return Api.admin().addCustomer(customer)
            .then(response => {
                console.log('AdminService.js/addCustomer/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    updateCustomer = async (updatedCustomer) => {
        console.log('AdminService.js/updateCustomer');
        return Api.admin().updateCustomer(updatedCustomer)
            .then(response => {
                console.log('AdminService.js/updateCustomer/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    deleteCustomer = async (id) => {
        console.log('AdminService.js/deleteCustomer');
        return Api.admin().deleteCustomer(id)
            .then(response => {
                console.log('AdminService.js/deleteCustomer/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getCompanyCoupons = async (id) => {
        console.log('AdminService.js/getCompanyCoupons, id: ', id);
        return Api.admin().getCompanyCoupons(id)
            .then(response => {
                console.log('AdminService.js/getCompanyCoupons/response: ', response);
                const coupons = response.data.map(coupon =>
                    new Coupon(
                        coupon.id,
                        coupon.title,
                        coupon.company,
                        coupon.category,
                        coupon.description,
                        coupon.startDate,
                        coupon.endDate,
                        coupon.amount,
                        coupon.price,
                        coupon.image
                    ));
                return { succeeded: true, coupons };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getCustomerCoupons = async (id) => {
        console.log('AdminService.js/getCustomerCoupons, id: ', id);
        return Api.admin().getCustomerCoupons(id)
            .then(response => {
                console.log('AdminService.js/getCustomerCoupons/response: ', response);
                const coupons = response.data.map(coupon =>
                    new Coupon(
                        coupon.id,
                        coupon.title,
                        coupon.company,
                        coupon.category,
                        coupon.description,
                        coupon.startDate,
                        coupon.endDate,
                        coupon.amount,
                        coupon.price,
                        coupon.image
                    ));
                return { succeeded: true, coupons };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };
};

export default AdminService;