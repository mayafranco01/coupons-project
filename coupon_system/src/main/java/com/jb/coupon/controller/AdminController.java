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

import com.jb.coupon.controller.model.ClientIdPayload;
import com.jb.coupon.controller.model.LoginPayload;
import com.jb.coupon.controller.model.ResponseDetails;
import com.jb.coupon.filter.utility.JwtUtil;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;
import com.jb.coupon.service.implementation.AdminServiceImpl;
import com.jb.coupon.service.model.LoginResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "coupons/")
public class AdminController extends ClientController {

	@Autowired
	private AdminServiceImpl adminServiceImpl;
	@Autowired
	private JwtUtil jwtUtil;
	private LoginResponse loginResponse;

	/*
	 * Login
	 */
	@PostMapping(path = "login/admin")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginPayload loginPayload) {
		loginResponse = adminServiceImpl.login(loginPayload.getEmail(), loginPayload.getPassword());
		return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
	}

//	@GetMapping(path = "admin/self")
//	public ResponseEntity<LoginResponse> getSelf(@RequestHeader(value = "authorization") String token) {
//		return ResponseEntity.status(HttpStatus.OK).body(jwtUtil.getLoginResponse(token));
//	}

	/*
	 * Add company
	 */
	@PostMapping(path = "admin/company/add")
	public ResponseEntity<ResponseDetails> addCompany(@RequestBody Company company,
			@RequestHeader(value = "authorization") String token) {
		adminServiceImpl.addCompany(company);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.CREATED.value())
				.message("The company was successfully added").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.CREATED).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Update company
	 */
	@PutMapping(path = "admin/company/update")
	public ResponseEntity<ResponseDetails> updateComapny(@RequestBody Company company,
			@RequestHeader(value = "authorization") String token) {
		adminServiceImpl.updateCompany(company);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The company has been successfully updated").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Delete company
	 */
	@DeleteMapping(path = "admin/company/delete")
	public ResponseEntity<ResponseDetails> deleteCompany(@RequestBody ClientIdPayload companyIdPayload,
			@RequestHeader(value = "authorization") String token) {
		adminServiceImpl.deleteCompany(companyIdPayload.getId());
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The company was successfully deleted").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Get all companies
	 */
	@GetMapping(path = "admin/companies")
	public ResponseEntity<Optional<List<Company>>> getAllCompanies(
			@RequestHeader(value = "authorization") String token) {
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(adminServiceImpl.getAllCompanies());
	}

	/*
	 * Get one company
	 */
	@PostMapping(path = "admin/company")
	public ResponseEntity<Optional<Company>> getOneCompany(@RequestBody ClientIdPayload companyIdPayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<Company> optionalCompany = adminServiceImpl.getOneCompany(companyIdPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(optionalCompany);
	}

	/*
	 * Add customer
	 */
	@PostMapping(path = "admin/customer/add")
	public ResponseEntity<ResponseDetails> addCustomer(@RequestBody Customer customer,
			@RequestHeader(value = "authorization") String token) {
		adminServiceImpl.addCustomer(customer);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.CREATED.value())
				.message("The customer was successfully added").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.CREATED).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Update customer
	 */
	@PutMapping(path = "admin/customer/update")
	public ResponseEntity<ResponseDetails> updateCustomer(@RequestBody Customer customer,
			@RequestHeader(value = "authorization") String token) {
		adminServiceImpl.updateCustomer(customer);
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The customer has been successfully updated").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Delete customer
	 */
	@DeleteMapping(path = "admin/customer/delete")
	public ResponseEntity<ResponseDetails> deleteCustomer(@RequestBody ClientIdPayload customerIdPayload,
			@RequestHeader(value = "authorization") String token) {
		adminServiceImpl.deleteCustomer(customerIdPayload.getId());
		ResponseDetails responseDetails = ResponseDetails.builder().code(HttpStatus.OK.value())
				.message("The customer was successfully deleted").build();
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.ok().header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(responseDetails);
	}

	/*
	 * Get all customers
	 */
	@GetMapping(path = "admin/customers")
	public ResponseEntity<Optional<List<Customer>>> getAllCustomers(
			@RequestHeader(value = "authorization") String token) {
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(adminServiceImpl.getAllCustomers());
	}

	/*
	 * Get one customer
	 */
	@PostMapping(path = "admin/customer")
	public ResponseEntity<Optional<Customer>> getOneCustomer(@RequestBody ClientIdPayload customerIdPayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<Customer> optionalCustomer = adminServiceImpl.getOneCustomer(customerIdPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(optionalCustomer);
	}
	
	/*
	 * Get company coupons
	 */
	@PostMapping(path = "admin/company/coupons")
	public ResponseEntity<Optional<List<Coupon>>> getCompanyCoupons(@RequestBody ClientIdPayload companyIdPayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<List<Coupon>> optionalCompanyCoupons = adminServiceImpl.getCompanyCoupons(companyIdPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(optionalCompanyCoupons);
	}
	
	/*
	 * Get customer coupons
	 */
	@PostMapping(path = "admin/customer/coupons")
	public ResponseEntity<Optional<List<Coupon>>> getCustomerCoupons(@RequestBody ClientIdPayload customerIdPayload,
			@RequestHeader(value = "authorization") String token) {
		Optional<List<Coupon>> optionalCustomerCoupons = adminServiceImpl.getCustomerCoupons(customerIdPayload.getId());
		loginResponse = jwtUtil.getLoginResponse(token);
		return ResponseEntity.status(HttpStatus.OK).header("Autorization", "Bearer " + loginResponse.getJwtToken())
				.body(optionalCustomerCoupons);
	}
}
