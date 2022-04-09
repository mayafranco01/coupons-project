package com.jb.coupon.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jb.coupon.controller.model.CategoryIdPayload;
import com.jb.coupon.controller.model.LoginPayload;
import com.jb.coupon.controller.model.MaxPricePayload;
import com.jb.coupon.controller.model.ResponseDetails;
import com.jb.coupon.filter.utility.JwtUtil;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;
import com.jb.coupon.service.implementation.CustomerServiceImpl;
import com.jb.coupon.service.model.LoginResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "coupons/")
public class CustomerController extends ClientController {

	@Autowired
	private CustomerServiceImpl customerServiceImpl;
	@Autowired
	private JwtUtil jwtUtil;
	private LoginResponse loginResponse;

	/*
	 * Login
	 */
	@PostMapping(path = "login/customer")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginPayload loginPayload) {
		loginResponse = customerServiceImpl.login(loginPayload.getEmail(), loginPayload.getPassword());
		return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
	}

//	@GetMapping(path = "customer/self")
//	public ResponseEntity<LoginResponse> getSelf(@RequestHeader(value = "authorization") String token) {
//		return ResponseEntity.status(HttpStatus.OK).body(jwtUtil.getLoginResponse(token));
//	}

	/*
	 * Purchase coupon
	 */
	@PutMapping(path = "customer/purchase")
	public ResponseEntity<ResponseDetails> purchaseCoupon(@RequestBody Coupon coupon,
			@RequestHeader(value = "authorization") String token) {
		customerServiceImpl.purchaseCoupon(coupon);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The purchase was successfully added").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Get customer coupons
	 */
	@GetMapping(path = "customer/coupons")
	public ResponseEntity<Optional<List<Coupon>>> getCustomerCoupons(
			@RequestHeader(value = "authorization") String token) {
		Optional<List<Coupon>> coupons = customerServiceImpl.getCustomerCoupons();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(coupons);
	}

	/*
	 * Get customer coupons by category
	 */
	@PostMapping(path = "customer/coupons/category")
	public ResponseEntity<Optional<List<Coupon>>> getCustomerCoupons(@RequestBody CategoryIdPayload categoryIdPayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<List<Coupon>> coupons = customerServiceImpl.getCustomerCoupons(categoryIdPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(coupons);
	}

	/*
	 * Get customer coupons by maximum price
	 */
	@PostMapping(path = "customer/coupons/maxPrice")
	public ResponseEntity<Optional<List<Coupon>>> getCustomerCoupons(@RequestBody MaxPricePayload maxPricePayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<List<Coupon>> coupons = customerServiceImpl.getCustomerCoupons(maxPricePayload.getMaxPrice());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(coupons);
	}

	/*
	 * Get customer details
	 */
	@GetMapping(path = "customer/details")
	public ResponseEntity<Optional<Customer>> getCustomerDetails(@RequestHeader(value = "authorization") String token) {
		Optional<Customer> optionalCustomer = customerServiceImpl.getCustomerDetails();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(optionalCustomer);
	}
}
