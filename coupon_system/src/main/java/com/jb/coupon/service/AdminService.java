package com.jb.coupon.service;

import java.util.List;
import java.util.Optional;

import com.jb.coupon.exception.CompanyNameInUseException;
import com.jb.coupon.exception.EmailInUseException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;

public interface AdminService {

	/**
	 * Function that adds a new company with unique name and email
	 * 
	 * @param company
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws EmailInUseException
	 * @throws CompanyNameInUseException
	 */
	void addCompany(Company company) throws NullDetailsException, InvalidDetailsException,
			EmailInUseException, CompanyNameInUseException;

	/**
	 * Function which updates an existing company except for company ID and company
	 * name
	 * 
	 * @param company
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws NotExistException
	 * @throws EmailInUseException
	 */
	void updateCompany(Company company) throws NullDetailsException, InvalidDetailsException, NotExistException,
			EmailInUseException;

	/**
	 * Function that deletes an existing company, its coupons and the history of
	 * coupons purchase by customers
	 * 
	 * @param companyId
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws NotExistException
	 */
	void deleteCompany(Long companyId) throws NullDetailsException, InvalidDetailsException, NotExistException;

	/**
	 * Function which returns all companies
	 * 
	 * @return Optional<List<Company>>
	 * @throws NotExistException
	 */
	Optional<List<Company>> getAllCompanies() throws NotExistException;

	/**
	 * This function returns a specific company by company ID
	 * 
	 * @param companyId
	 * @return Optional<Company>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws NotExistException
	 */
	Optional<Company> getOneCompany(Long companyId)
			throws NullDetailsException, InvalidDetailsException, NotExistException;
	
	/**
	 * Function that returns company coupons by company ID
	 * 
	 * @param companyId
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCompanyCoupons(Long companyId)
			throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;

	/**
	 * Function which adds a new customer and verifies that its email is unique
	 * 
	 * @param customer
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws EmailInUseException
	 */
	void addCustomer(Customer customer)
			throws NullDetailsException, InvalidDetailsException, EmailInUseException;

	/**
	 * Function that updates an existing customer except for its ID
	 * 
	 * @param Customer
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws EmailInUseException
	 * @throws NotExistException
	 */
	void updateCustomer(Customer customer) throws NullDetailsException, InvalidDetailsException,
			EmailInUseException, NotExistException;

	/**
	 * Function which deletes an existing customer and its coupons purchase history
	 * 
	 * @param customerId
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws NotExistException
	 */
	void deleteCustomer(Long customerId)
			throws NullDetailsException, InvalidDetailsException, NotExistException;

	/**
	 * Function that returns all customers
	 * 
	 * @return Optional<List<Customer>>
	 * @throws NotExistException
	 */
	Optional<List<Customer>> getAllCustomers() throws NotExistException;

	/**
	 * Function that returns one customer by customer ID
	 * 
	 * @param customerId
	 * @return Optional<Customer>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws NotExistException
	 */
	Optional<Customer> getOneCustomer(Long customerId)
			throws NullDetailsException, InvalidDetailsException, NotExistException;
	
	/**
	 * Function that returns customer coupons by customer ID
	 * 
	 * @param customerId
	 * @return Optional<List<Coupon>>
	 * @throws NullDetailsException
	 * @throws InvalidDetailsException
	 * @throws SomethingWentWrong
	 */
	Optional<List<Coupon>> getCustomerCoupons(Long customerId)
			throws NullDetailsException, InvalidDetailsException, SomethingWentWrong;
}
