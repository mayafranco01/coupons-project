package com.jb.coupon.service;

import java.util.List;
import java.util.Optional;

import com.jb.coupon.exception.CouponAlreadyExistsException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;

public interface CompanyService {

	/**
	 * Function that add coupon and verifies unique title per company
	 * 
	 * @param coupon
	 * @throws NullDetailsException 
	 * @throws InvalidDetailsException 
	 * @throws CouponAlreadyExistsException 
	 * @throws SomethingWentWrong 
	 */
	void addCoupon(Coupon coupon) throws NullDetailsException, InvalidDetailsException, CouponAlreadyExistsException, SomethingWentWrong;
	
	/**
	 * Function that updates coupon details except for coupon ID and company ID
	 * 
	 * @param coupon
	 * @throws NullDetailsException 
	 * @throws InvalidDetailsException 
	 * @throws CouponAlreadyExistsException 
	 * @throws NotExistException 
	 */
	void updateCoupun(Coupon coupon) throws NullDetailsException, InvalidDetailsException, CouponAlreadyExistsException, NotExistException;
	
	/**
	 * Function which deletes an existing coupon and coupon purchase history by
	 * customers
	 * 
	 * @param couponId
	 * @throws NullDetailsException 
	 * @throws InvalidDetailsException 
	 * @throws NotExistException 
	 */
	void deleteCoupon(Long couponId) throws NullDetailsException, InvalidDetailsException, NotExistException;
	
	/**
	 * Function that returns all the coupons of a company
	 * 
	 * @return Optional<List<Coupon>>
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCompanyCoupons() throws SomethingWentWrong;
	
	/**
	 * Function that returns all the coupons of a company from specific category
	 * 
	 * @param categoryId
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCompanyCoupons(Integer categoryId) throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;

	/**
	 * Function that returns all the coupons of a company up to maximum price
	 * 
	 * @param maxPrice
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCompanyCoupons(Double maxPrice) throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;
	
	/**
	 * Function that returns company details
	 * @return Optional<Company>
	 * @throws NotExistException
	 */
	Optional<Company> getCompanyDetails() throws NotExistException;
	
	/**
	 * Function that returns a coupon by its ID
	 * 
	 * @param couponId
	 * @return Optional<Coupon>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws NotExistException
	 */
	Optional<Coupon> getOneCoupon(Long couponId) throws NullDetailsException, InvalidDetailsException, NotExistException;
}
