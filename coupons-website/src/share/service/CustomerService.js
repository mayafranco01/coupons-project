// import Api - axios HTTP communication handler
import Api from '../api/Api';

// import Coupon object model class
import Coupon from '../model/core.coupon';

// import CatchErrors Component
import CatchErrors from './CatchErrors';

class CustomerService {

    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    };

    getCustomerCoupons = async () => {
        console.log('CustomerService.js/getCustomerCoupons');
        return Api.customer().getCustomerCoupons()
            .then(response => {
                console.log('CustomerService.js/getCustomerCoupons/response: ', response);
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

    getCustomerPurchasesByCategory = async (category) => {
        console.log('CustomerService.js/getCustomerPurchasesByCategory');
        return Api.customer().getCustomerCouponsByCategory(category)
            .then(response => {
                console.log('CustomerService.js/getCustomerPurchasesByCategory/response: ', response);
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

    getCustomerPurchasesByMaxPrice = async (maxPrice) => {
        console.log('CustomerService.js/getCustomerPurchasesByMaxPrice');
        return Api.customer().getCustomerCouponsByMaxPrice(maxPrice)
            .then(response => {
                console.log('CustomerService.js/getCustomerPurchasesByMaxPrice/response: ', response);
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

    purchaseCoupon = async (purchasedCoupon) => {
        console.log('CustomerService.js/purchaseCoupon');
        return Api.customer().purchaseCoupon(purchasedCoupon)
            .then(response => {
                console.log('CustomerService.js/purchaseCoupon/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getCustomerDetails = async () => {
        console.log('CustomerService.js/getCustomerDetails');
        return Api.customer().getCustomerDetails()
            .then(response => {
                console.log('CustomerService.js/getCustomerDetails/response: ', response);
                const customer = response.data;
                return { succeeded: true, customer };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };
};

export default CustomerService;