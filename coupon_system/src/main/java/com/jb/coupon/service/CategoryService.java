package com.jb.coupon.service;

import java.util.List;
import java.util.Optional;

import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.model.Category;
import com.jb.coupon.model.Coupon;

public interface CategoryService {

	/**
	 * Function that get a category ID and returns all coupons from this category
	 * 
	 * @param categoryId
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCouponsByCategory(Integer categoryId) throws NullDetailsException, SomethingWentWrong;

	/**
	 * Function that returns list of all the categories
	 * 
	 * @return Optional<List<CategoryEnum>>
	 * @throws SomethingWentWrong
	 */
	Optional<List<Category>> getAllCategories() throws SomethingWentWrong;
}
