package com.jb.coupon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.LoginFailedException;
import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.repository.CategoryRepository;
import com.jb.coupon.repository.CompanyRepository;
import com.jb.coupon.repository.CouponRepository;
import com.jb.coupon.repository.CustomerRepository;
import com.jb.coupon.service.model.LoginResponse;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@Scope("prototype")
@NoArgsConstructor
@AllArgsConstructor
public abstract class ClientService {

	/**
	 * Class Attributes
	 */
	@Autowired
	protected CompanyRepository companyRepository;
	@Autowired
	protected CouponRepository couponRepository;
	@Autowired
	protected CustomerRepository customerRepository;
	@Autowired
	protected CategoryRepository categoryRepository;

	/**
	 * login function sends a token to confirm that the user is authorized if the
	 * email and password are verified
	 * 
	 * @param email
	 * @param password
	 * @return LoginResponse
	 * @throws InvalidDetailsException
	 * @throws NullDetailsException
	 * @throws NotExistException
	 * @throws LoginFailedException
	 */
	public abstract LoginResponse login(String email, String password);
}
