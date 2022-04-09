package com.jb.coupon.service;

import java.util.List;
import java.util.Optional;

import com.jb.coupon.exception.CouponAlreadyPurchasedException;
import com.jb.coupon.exception.CouponOutOfStockException;
import com.jb.coupon.exception.ExpiredCouponException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;

public interface CustomerService {

	/**
	 * This function verifies the coupon was purchased only once by the customer,
	 * availability in stock, expiration and updates quantity in stock
	 * 
	 * @param coupon
	 * @throws NullDetailsException
	 * @throws CouponAlreadyPurchasedException
	 * @throws NotExistException
	 * @throws CouponOutOfStockException
	 * @throws ExpiredCouponException
	 */
	void purchaseCoupon(Coupon coupon) throws NullDetailsException, CouponAlreadyPurchasedException,
			NotExistException, CouponOutOfStockException, ExpiredCouponException;

	/**
	 * Function that returns all customer coupons
	 * 
	 * @return Optional<List<Coupon>>
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCustomerCoupons() throws SomethingWentWrong;

	/**
	 * Function that returns customer coupons from specific category
	 * 
	 * @param categoryId
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws SomethingWentWrong
	 */
//	Optional<List<Coupon>> getCustomerCoupons(CategoryEnum category)
//			throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;
	Optional<List<Coupon>> getCustomerCoupons(Integer categoryId)
			throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;

	/**
	 * Function that returns customer coupons up to maximum price
	 * 
	 * @param maxPrice
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCustomerCoupons(Double maxPrice)
			throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;

	/**
	 * Function that returns customer details
	 * 
	 * @return Optional<Customer>
	 * @throws NotExistException
	 */
	Optional<Customer> getCustomerDetails() throws NotExistException;
}
