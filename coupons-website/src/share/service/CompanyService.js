// import Api - axios HTTP communication handler
import Api from '../api/Api';

// import Coupon object model class
import Coupon from '../model/core.coupon';

// import CatchErrors Component
import CatchErrors from './CatchErrors';

class CompanyService {

    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    };

    getAllCoupons = async () => {
        console.log('CompanyService.js/getAllCoupons');
        return Api.company().getAllCoupons()
            .then(response => {
                console.log('CompanyService.js/getAllCoupons/response: ', response);
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

    getCouponsByCategory = async (category) => {
        console.log('CompanyService.js/getCouponsByCategory, category: ', category);
        return Api.company().getCouponsByCategory(category)
            .then(response => {
                console.log('CompanyService.js/getCouponsByCategory/response: ', response);
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

    getCouponsByMaxPrice = async (maxPrice) => {
        console.log('CompanyService.js/getCouponsByMaxPrice');
        return Api.company().getCouponsByMaxPrice(maxPrice)
            .then(response => {
                console.log('CompanyService.js/getCouponsByMaxPrice/response: ', response);
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

    addCoupon = async (coupon) => {
        console.log('CompanyService.js/addCoupon');
        return Api.company().addCoupon(coupon)
            .then(response => {
                console.log('CompanyService.js/addCoupon/response: ', response);
                coupon.id = response.data.id;
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    updateCoupon = async (updatedCoupon) => {
        console.log('CompanyService.js/updateCoupon');
        return Api.company().updateCoupon(updatedCoupon)
            .then(response => {
                console.log('CompanyService.js/updateCoupon/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    deleteCoupon = async (id) => {
        console.log('CompanyService.js/deleteCoupon');
        return Api.company().deleteCoupon(id)
            .then(response => {
                console.log('CompanyService.js/deleteCoupon/response: ', response);
                return { succeeded: true };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getCompanyDetails = () => {
        console.log('CompanyService.js/getCompanyDetails');
        return Api.company().getCompanyDetails()
            .then(response => {
                console.log('CompanyService.js/getCompanyDetails/response: ', response);
                const company = response.data;
                return { succeeded: true, company };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getOneCoupon = async (id) => {
        console.log('CompanyService.js/getOneCoupon');
        return Api.company().getOneCoupon(id)
            .then(response => {
                console.log('CompanyService.js/getOneCoupon/response: ', response);
                const coupon = response.data;
                return { succeeded: true, coupon };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };
};

export default CompanyService;