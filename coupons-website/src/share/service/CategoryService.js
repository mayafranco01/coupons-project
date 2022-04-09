// import CategoryApi - axios HTTP communication handler
import CategoryApi from '../api/CategoryApi';

// import Category and Coupon object model classes
import Category from '../model/core.category';
import Coupon from '../model/core.coupon';

// import CatchErrors Component
import CatchErrors from './CatchErrors';

class CategoryService {

    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    };

    getCategories = async () => {
        console.log('CategoryService.js/getCategories');
        let categories = [];
        return CategoryApi.category().getCategories()
            .then(response => {
                console.log('CategoryService.js/getCategories/response: ', response);
                categories = response.data.map(category =>
                    new Category(
                        category.id,
                        category.name));
                return { succeeded: true, categories };
            }).catch(err => {
                return CatchErrors(this.dispatch, err);
            });
    };

    getCouponsByCategory = async (category) => {
        console.log('CategoryService.js/getCategories/category: ', category);
        return CategoryApi.category().getCouponsByCategory(category)
            .then(response => {
                console.log('CategoryService.js/getCouponsByCategory/response: ', response);
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

export default CategoryService;