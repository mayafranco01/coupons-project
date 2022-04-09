package com.jb.coupon.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
	
	/**
	 * This derived query function returns a list of all company coupons
	 * 
	 * @param companyId
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCompanyId(Long companyId);

	/**
	 * This derived query function returns a list of all coupons from a specific
	 * category of company
	 * 
	 * @param companyId
	 * @param categoryId
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCompanyIdAndCategoryId(Long companyId, Integer categoryId);

	/**
	 * This derived query function returns a list of all customer coupons from a
	 * specific category
	 * 
	 * @param customerId
	 * @param categoryId
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCustomersAndCategoryId(Customer customer, Integer categoryId);

	/**
	 * The purpose of this derived query function is to check if the company has a
	 * coupon with the same title because it's impossible to add a new coupon with
	 * an existing title
	 * 
	 * @param companyId
	 * @param title
	 * @return Optional<Coupon>
	 */
	Optional<Coupon> findByCompanyIdAndTitleIgnoreCase(Long companyId, String title);

	/**
	 * This derived query function checks if a coupon exists by coupon ID and company ID
	 * 
	 * @param id
	 * @param companyId
	 * @return boolean
	 */
	boolean existsByIdAndCompanyId(Long id, Long companyId);

	/**
	 * This derived query function returns a list of all company coupons up to maximum price
	 * 
	 * @param companyId
	 * @param maxPrice
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCompanyIdAndPriceLessThanEqual(Long companyId, Double maxPrice);

	/**
	 * This derived query function returns a list of all customer coupons up to maximum price
	 * 
	 * @param customerId
	 * @param maxPrice
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCustomersIdAndPriceLessThanEqual(Long customerId, Double maxPrice);

	/**
	 * This derived query function purpose is to return all coupons in the system that have expired for the daily job scheduler
	 * 
	 * @param endDate
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByEndDateBefore(LocalDate endDate);

	/**
	 * Purchase:
	 */
	
	/**
	 * This derived query function returns a list of all customer coupons
	 * 
	 * @param customerId
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCustomersId(Long customerId);

	/**
	 * This derived query function checks if a purchase exists by coupon ID and customer ID
	 * 
	 * @param customerId
	 * @param couponId
	 * @return boolean
	 */
	boolean existsByCustomersIdAndId(Long customerId, Long couponId);

	/**
	 * This derived query function deletes all the coupons of a company by company ID
	 * 
	 * @param companyId
	 */
	void deleteByCompanyId(Long companyId);
	
	/**
	 * This derived query function receives all coupons from a specific category
	 * 
	 * @param categoryId
	 * @return Optional<List<Coupon>>
	 */
	Optional<List<Coupon>> findByCategoryId(Integer categoryId);
}
