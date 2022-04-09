package com.jb.coupon.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jb.coupon.exception.CompanyNameInUseException;
import com.jb.coupon.exception.EmailInUseException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.LoginFailedException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.exception.utility.NullUtil;
import com.jb.coupon.exception.utility.RegexUtil;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;
import com.jb.coupon.service.AdminService;
import com.jb.coupon.service.ClientService;
import com.jb.coupon.service.model.ClientType;
import com.jb.coupon.service.model.LoginResponse;
import com.jb.coupon.service.response.LoginResponseBuilder;
import com.jb.coupon.service.utility.LockUtil;

@Service
public class AdminServiceImpl extends ClientService implements AdminService {

	/**
	 * Class Attributes
	 */
	@Autowired
	private LoginResponseBuilder loginResponseBuilder;
	@Autowired
	private NullUtil nullUtil;

	@Override
	public LoginResponse login(String email, String password) {
		if (!email.equalsIgnoreCase("admin@admin.com")) {
			throw new InvalidDetailsException("email", email);
		}
		if (!password.equals("admin")) {
			throw new InvalidDetailsException("password", password);
		}
		System.out.println("Administrator login succeded");
		String clientType = ClientType.ADMIN.toString().toLowerCase();
		LoginResponse loginResponse = loginResponseBuilder.build(0L, clientType);
		if (loginResponse == null) {
			throw new LoginFailedException(clientType);
		}
		return loginResponse;
	}

	@Override
	@Transactional(readOnly = false)
	public void addCompany(Company company) {
		nullUtil.validate(company, "company");
		nullUtil.validate(company.getEmail(), "email address");
		nullUtil.validate(company.getName(), "name");
		nullUtil.validate(company.getPassword(), "password");
		if (company.getName().isEmpty()) {
			throw new InvalidDetailsException("name", company.getName());
		}
		if (company.getPassword().isEmpty()) {
			throw new InvalidDetailsException("password", company.getPassword());
		}
		if (!RegexUtil.isEmailValid(company.getEmail())) {
			throw new InvalidDetailsException("email address", company.getEmail());
		}
		if (company.getId() != null) {
			throw new InvalidDetailsException("The ID of a new company must be empty");
		}
		synchronized (LockUtil.company()) {
			/*
			 * Make sure there's no other company with the same name or email address
			 */
			if (companyRepository.existsByName(company.getName())) {
				throw new CompanyNameInUseException(company);
			}
			if (companyRepository.existsByEmail(company.getEmail())) {
				throw new EmailInUseException(company.getEmail().toLowerCase());
			}
			companyRepository.save(company);
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void updateCompany(Company company) {
		nullUtil.validate(company, "company");
		nullUtil.validate(company.getId(), "company");
		nullUtil.validate(company.getEmail(), "email");
		nullUtil.validate(company.getName(), "name");
		nullUtil.validate(company.getPassword(), "password");
		if (!RegexUtil.isEmailValid(company.getEmail())) {
			throw new InvalidDetailsException("email", company.getEmail());
		}
		if (company.getId() < 1) {
			throw new InvalidDetailsException("company", company.getId());
		}
		if (company.getName().isEmpty()) {
			throw new InvalidDetailsException("name", company.getName());
		}
		if (company.getPassword().isEmpty()) {
			throw new InvalidDetailsException("password", company.getPassword());
		}
		Optional<Company> optionalCompany = companyRepository.findById(company.getId());
		if (optionalCompany == null || optionalCompany.isEmpty()) {
			throw new NotExistException("ID", company.getId());
		}
		/*
		 * Make sure the company name doesn't change
		 */
		if (!company.getName().equalsIgnoreCase(optionalCompany.get().getName())) {
			throw new InvalidDetailsException("There is no permission to change the name of the company");
		}
		/*
		 * Make sure there's no other company with the same email address if there's an
		 * attempt to update the email address
		 */
		if (companyRepository.existsByEmailIgnoreCaseAndIdNotLike(company.getEmail(), company.getId())) {
			throw new EmailInUseException(company.getEmail().toLowerCase());
		}
		synchronized (LockUtil.company()) {
			companyRepository.save(company);
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void deleteCompany(Long companyId) {
		nullUtil.validate(companyId, "company");
		if (companyId < 1) {
			throw new InvalidDetailsException("company", companyId);
		}
		Optional<Company> optionalCompany = companyRepository.findById(companyId);
		if (optionalCompany == null || optionalCompany.isEmpty()) {
			throw new NotExistException("The company not exists");
		} else {
			Optional<List<Coupon>> optionalCoupons = couponRepository.findByCompanyId(companyId);
			optionalCoupons.ifPresent((coupons) -> {
				couponRepository.deleteByCompanyId(companyId);
				optionalCompany.get().getCoupons().removeAll(coupons);
			});
			companyRepository.deleteById(companyId);
		}
	}

	@Override
	public Optional<List<Company>> getAllCompanies() {
		Optional<List<Company>> optionalCompanies = Optional.of(companyRepository.findAll());
		if (optionalCompanies == null) {
			throw new NotExistException("Cannot get a list of all the companies from the system");
		}
		if (optionalCompanies.isEmpty()) {
			System.out.println("There are no companies in the system");
		}
		System.out.println("\nThese are the companies in the system:");
		optionalCompanies.get().forEach(System.out::println);
		return Optional.of(optionalCompanies.get());
	}

	public Optional<Company> getOneCompany(Long companyId) {
		nullUtil.validate(companyId, "company");
		if (companyId < 1) {
			throw new InvalidDetailsException("The company not exists");
		}
		return Optional
				.of(companyRepository.findById(companyId).orElseThrow(() -> new NotExistException("The company not exists")));
	}

	@Override
	@Transactional(readOnly = false)
	public void addCustomer(Customer customer) {
		nullUtil.validate(customer, "customer");
		nullUtil.validate(customer.getEmail(), "email address");
		nullUtil.validate(customer.getPassword(), "password");
		nullUtil.validate(customer.getFirstName(), "first name");
		nullUtil.validate(customer.getLastName(), "last name");
		if (customer.getEmail().isEmpty()) {
			throw new InvalidDetailsException("email address", customer.getEmail());
		}
		if (!RegexUtil.isEmailValid(customer.getEmail())) {
			throw new InvalidDetailsException("email address ", customer.getEmail());
		}
		if (customer.getFirstName().isEmpty()) {
			throw new InvalidDetailsException("first name", customer.getFirstName());
		}
		if (customer.getLastName().isEmpty()) {
			throw new InvalidDetailsException("last name", customer.getLastName());
		}
		if (customer.getPassword().isEmpty()) {
			throw new InvalidDetailsException("password", customer.getPassword());
		}
		if (customer.getId() != null) {
			throw new InvalidDetailsException("The ID must be empty");
		}
		synchronized (LockUtil.customer()) {
			/*
			 * Make sure there's no other customer with the same email address
			 */
			if (customerRepository.existsByEmail(customer.getEmail())) {
				throw new EmailInUseException(customer.getEmail());
			} else {
				customerRepository.save(customer);
			}
		}

	}

	@Override
	@Transactional(readOnly = false)
	public void updateCustomer(Customer customer) {
		nullUtil.validate(customer, "customer");
		nullUtil.validate(customer.getId(), "customer");
		nullUtil.validate(customer.getEmail(), "email address");
		nullUtil.validate(customer.getFirstName(), "first name");
		nullUtil.validate(customer.getLastName(), "last name");
		nullUtil.validate(customer.getPassword(), "password");
		if (customer.getId() < 1) {
			throw new InvalidDetailsException("customer", customer.getId());
		}
		if (!RegexUtil.isEmailValid(customer.getEmail())) {
			throw new InvalidDetailsException("email address", customer.getEmail());
		}
		if (customer.getFirstName().isEmpty()) {
			throw new InvalidDetailsException("first name", customer.getFirstName());
		}
		if (customer.getLastName().isEmpty()) {
			throw new InvalidDetailsException("last name", customer.getLastName());
		}
		if (customer.getPassword().isEmpty()) {
			throw new InvalidDetailsException("password", customer.getPassword());
		}
		Optional<Customer> optionalCustomer = customerRepository.findById(customer.getId());
		if (optionalCustomer == null || optionalCustomer.isEmpty()) {
			throw new NotExistException("ID ", customer.getId());
		}
		/*
		 * Make sure there's no other customer with the same email address if there's an
		 * attempt to update the email address
		 */
		if (customerRepository.existsByIdNotLikeAndEmail(customer.getId(), customer.getEmail())) {
			throw new EmailInUseException(customer.getEmail());
		}
		Optional<List<Coupon>> optionalCustomerCoupons = couponRepository.findByCustomersId(customer.getId());
		customer.setCoupons(optionalCustomerCoupons.get());
		synchronized (LockUtil.customer()) {
			for (Coupon coupon : optionalCustomerCoupons.get()) {
				couponRepository.save(coupon);
			}
			customerRepository.save(customer);
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void deleteCustomer(Long customerId) {
		nullUtil.validate(customerId, "customer");
		if (customerId < 1) {
			throw new InvalidDetailsException("customer", customerId);
		}
		Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
		if (optionalCustomer == null || optionalCustomer.isEmpty()) {
			throw new NotExistException("The customer not exists");
		}
		customerRepository.delete(optionalCustomer.get());
	}

	@Override
	public Optional<List<Customer>> getAllCustomers() {
		Optional<List<Customer>> optionalCustomers = Optional.of(customerRepository.findAll());
		if (optionalCustomers == null) {
			throw new NotExistException("There are no customers to show");
		}
		System.out.println("\nThese are the customers in the system:");
		optionalCustomers.get().forEach(System.out::println);
		return Optional.of(optionalCustomers.get());
	}

	@Override
	public Optional<Customer> getOneCustomer(Long customerId) {
		nullUtil.validate("There is no customer to show.");
		if (customerId < 1) {
			throw new InvalidDetailsException("The customer not exists");
		}
		return Optional.ofNullable(customerRepository.findById(customerId)
				.orElseThrow(() -> new NotExistException("The customer not exists")));
	}

	@Override
	public Optional<List<Coupon>> getCompanyCoupons(Long companyId) {
		nullUtil.validate(companyId, "company");
		if (companyId < 1) {
			throw new InvalidDetailsException("company", companyId);
		}
		return Optional.ofNullable(couponRepository.findByCompanyId(companyId)
				.orElseThrow(() -> new SomethingWentWrong("company coupons")));
	}

	@Override
	public Optional<List<Coupon>> getCustomerCoupons(Long customerId) {
		nullUtil.validate(customerId, "customer");
		if (customerId < 1) {
			throw new InvalidDetailsException("customer", customerId);
		}
		return Optional.ofNullable(couponRepository.findByCustomersId(customerId)
				.orElseThrow(() -> new SomethingWentWrong("customer coupons")));
	}
}
