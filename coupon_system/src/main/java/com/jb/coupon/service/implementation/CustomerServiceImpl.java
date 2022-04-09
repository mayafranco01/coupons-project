package com.jb.coupon.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jb.coupon.exception.CouponAlreadyPurchasedException;
import com.jb.coupon.exception.CouponOutOfStockException;
import com.jb.coupon.exception.ExpiredCouponException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.LoginFailedException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.exception.utility.NullUtil;
import com.jb.coupon.exception.utility.RegexUtil;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;
import com.jb.coupon.service.ClientService;
import com.jb.coupon.service.CustomerService;
import com.jb.coupon.service.model.ClientType;
import com.jb.coupon.service.model.LoginResponse;
import com.jb.coupon.service.model.UserDetails;
import com.jb.coupon.service.response.LoginResponseBuilder;
import com.jb.coupon.service.utility.LockUtil;

@Service
public class CustomerServiceImpl extends ClientService implements CustomerService {

	/**
	 * Class Attributes
	 */
	@Autowired
	private UserDetails userDetails;
	@Autowired
	private NullUtil nullUtil;
	@Autowired
	private LoginResponseBuilder loginResponseBuilder;

	@Override
	public LoginResponse login(String email, String password) {
		nullUtil.validate(email, "email address");
		nullUtil.validate(password, "password");
		if (password.isEmpty()) {
			throw new InvalidDetailsException("password", password);
		} else if (!RegexUtil.isEmailValid(email)) {
			throw new InvalidDetailsException("email", email);
		} else if (customerRepository.existsByEmail(email)) {
			Optional<Customer> optionalCustomer = customerRepository.findByEmailAndPassword(email, password);
			if (optionalCustomer == null || optionalCustomer.isEmpty()) {
				throw new InvalidDetailsException("password", password);
			} else {
				System.out.println("Customer login succeded");
				Long customerId = optionalCustomer.get().getId();
				String clientType = ClientType.CUSTOMER.toString().toLowerCase();
				userDetails = new UserDetails(customerId, clientType);
				LoginResponse loginResponse = loginResponseBuilder.build(customerId, clientType);
				if (loginResponse == null) {
					throw new LoginFailedException(clientType);
				}
				return loginResponse;
			}
		} else {
			throw new NotExistException("email address", email);
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void purchaseCoupon(Coupon coupon) {
		nullUtil.validate(coupon, "coupon");
		if (couponRepository.existsByCustomersIdAndId(userDetails.getId(), coupon.getId())) {
			throw new CouponAlreadyPurchasedException(coupon);
		} else {
			Optional<Customer> optionalCustomer = customerRepository.findById(userDetails.getId());
			Optional<Coupon> optionalRequestedCoupon = couponRepository.findById(coupon.getId());

			if (optionalRequestedCoupon == null || optionalRequestedCoupon.isEmpty()) {
				throw new NotExistException("title", optionalRequestedCoupon.get().getTitle());
			} else if (optionalRequestedCoupon.get().getAmount() < 1) {
				throw new CouponOutOfStockException(optionalRequestedCoupon.get());
			} else if (optionalRequestedCoupon.get().getEndDate().isBefore(LocalDate.now())) {
				throw new ExpiredCouponException(optionalRequestedCoupon.get());
			} else if (optionalRequestedCoupon.get().getStartDate().isAfter(LocalDate.now())) {
				throw new ExpiredCouponException(optionalRequestedCoupon.get());
			} else {
				synchronized (LockUtil.coupon()) {
					/*
					 * Add coupon to the customer coupons' list and save to the DB
					 */
					optionalCustomer.get().getCoupons().add(optionalRequestedCoupon.get());
					customerRepository.save(optionalCustomer.get());
					/*
					 * Update the quantity of this coupon in stock after purchase
					 */
					optionalRequestedCoupon.get().setAmount(optionalRequestedCoupon.get().getAmount() - 1);
					couponRepository.save(optionalRequestedCoupon.get());
				}
			}
		}
	}

	@Override
	public Optional<List<Coupon>> getCustomerCoupons() {
		Optional<List<Coupon>> optionalCustomerCoupons = couponRepository.findByCustomersId(userDetails.getId());
		if (optionalCustomerCoupons == null) {
			throw new SomethingWentWrong("coupons");
		} else {
			System.out.println("The customer's coupons are: " + optionalCustomerCoupons);
			return optionalCustomerCoupons;
		}
	}

	@Override
	public Optional<List<Coupon>> getCustomerCoupons(Integer categoryId) {
		nullUtil.validate(categoryId, "category");
		Optional<Customer> optionalCustomer = customerRepository.findById(userDetails.getId());
		Optional<List<Coupon>> optionalCoupons = couponRepository.findByCustomersAndCategoryId(optionalCustomer.get(),
				categoryId);
		if (optionalCoupons == null) {
			throw new SomethingWentWrong("couons");
		}
		System.out.println("These are the customer's coupons for the customer " + optionalCustomer.get().getFirstName()
				+ optionalCustomer.get().getLastName() + ":\n" + optionalCoupons.get());
		return optionalCoupons;
	}

	@Override
	public Optional<List<Coupon>> getCustomerCoupons(Double maxPrice) {
		nullUtil.validate(maxPrice, "maximum price");
		if (maxPrice < 0) {
			throw new InvalidDetailsException("price", maxPrice);
		}
		Optional<Customer> optionalCustomer = customerRepository.findById(userDetails.getId());
		Optional<List<Coupon>> optionalCoupons = couponRepository
				.findByCustomersIdAndPriceLessThanEqual(userDetails.getId(), maxPrice);
		if (optionalCoupons == null) {
			throw new SomethingWentWrong("coupons");
		}
		System.out.println("These are the customer's coupons for the customer " + optionalCustomer.get().getFirstName()
				+ " " + optionalCustomer.get().getLastName() + ":\n" + optionalCoupons.get());
		return optionalCoupons;
	}

	@Override
	public Optional<Customer> getCustomerDetails() {
		if (userDetails.getId() == null) {
			throw new NotExistException("The client not exists");
		}
		Optional<Customer> optionalCustomer = customerRepository.findById(userDetails.getId());
		System.out.println("These are the customer's details: [" + optionalCustomer.get() + "]"
				+ " and the customer's coupons are: [" + optionalCustomer.get().getCoupons() + "]");
		return Optional.ofNullable(optionalCustomer.get());
	}
}
