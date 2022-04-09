package com.jb.coupon.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jb.coupon.controller.model.CategoryIdPayload;
import com.jb.coupon.controller.model.ClientIdPayload;
import com.jb.coupon.controller.model.LoginPayload;
import com.jb.coupon.controller.model.MaxPricePayload;
import com.jb.coupon.controller.model.ResponseDetails;
import com.jb.coupon.filter.utility.JwtUtil;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.service.implementation.CompanyServiceImpl;
import com.jb.coupon.service.model.LoginResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "coupons/")
public class CompanyController extends ClientController {

	@Autowired
	private CompanyServiceImpl companyServiceImpl;
	@Autowired
	private JwtUtil jwtUtil;
	private LoginResponse loginResponse;

	/*
	 * Login
	 */
	@PostMapping(path = "login/company")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginPayload loginPayload) {
		loginResponse = companyServiceImpl.login(loginPayload.getEmail(), loginPayload.getPassword());
		return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
	}

//	@GetMapping(path = "company/self")
//	public ResponseEntity<LoginResponse> getSelf(@RequestHeader(value = "authorization") String token) {
//		return ResponseEntity.status(HttpStatus.OK).body(jwtUtil.getLoginResponse(token));
//	}

	/*
	 * Add coupon
	 */
	@PostMapping(path = "company/coupon/add")
	public ResponseEntity<ResponseDetails> addCoupon(@RequestBody Coupon coupon,
			@RequestHeader(value = "authorization") String token) {
		companyServiceImpl.addCoupon(coupon);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.CREATED.value())
				.message("The coupon was successfully added").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.CREATED)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(responseDetails);
	}

	/*
	 * Update coupon
	 */
	@PutMapping(path = "company/coupon/update")
	public ResponseEntity<ResponseDetails> updateCoupon(@RequestBody Coupon coupon,
			@RequestHeader(value = "authorization") String token) {
		companyServiceImpl.updateCoupun(coupon);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The coupon has been successfully updated").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Delete coupon
	 */
	@DeleteMapping(path = "company/coupon/delete")
	public ResponseEntity<ResponseDetails> deleteCoupon(@RequestBody ClientIdPayload couponIdPayload,
			@RequestHeader(value = "authorization") String token) {
		companyServiceImpl.deleteCoupon(couponIdPayload.getId());
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The coupon was successfully deleted").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Get company coupons
	 */
	@GetMapping(path = "company/coupons")
	public ResponseEntity<Optional<List<Coupon>>> getCompanyCoupons(
			@RequestHeader(value = "authorization") String token) {
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(companyServiceImpl.getCompanyCoupons());
	}

	/*
	 * Get company coupons by category
	 */
	@PostMapping(path = "company/coupons/category")
	public ResponseEntity<Optional<List<Coupon>>> getCompanyCoupons(@RequestBody CategoryIdPayload categoryIdPayload,
			@RequestHeader(value = "authorization") String token) {
		System.out.println("categoryIdPayload" + categoryIdPayload.getId());
		Optional<List<Coupon>> optionalCoupons = companyServiceImpl.getCompanyCoupons(categoryIdPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(optionalCoupons);
	}

	/*
	 * Get company coupons by maximum price
	 */
	@PostMapping(path = "company/coupons/maxPrice")
	public ResponseEntity<Optional<List<Coupon>>> getCompanyCoupons(@RequestBody MaxPricePayload maxPricePayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<List<Coupon>> optionalCoupons = companyServiceImpl.getCompanyCoupons(maxPricePayload.getMaxPrice());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(optionalCoupons);
	}

	/*
	 * Get company details
	 */
	@GetMapping(path = "company/details")
	public ResponseEntity<Optional<Company>> getCompanyDetails(@RequestHeader(value = "authorization") String token) {
		Optional<Company> optionalCompany = companyServiceImpl.getCompanyDetails();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(optionalCompany);
	}

	/*
	 * Get One coupon
	 */
	@PostMapping(path = "company/coupon")
	public ResponseEntity<Optional<Coupon>> getOneCoupon(@RequestBody ClientIdPayload idPayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<Coupon> optionalCoupon = companyServiceImpl.getOneCoupon(idPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK)
				.header("Autorization", "Bearer " + loginResponse.getJwtToken()).body(optionalCoupon);
	}
}
