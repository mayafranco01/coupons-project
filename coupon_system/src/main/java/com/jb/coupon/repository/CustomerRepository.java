package com.jb.coupon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jb.coupon.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	/**
	 * This derived query function checks if there is another customer in the system with the same email address
	 * and checks in the login function if the e-mail address is exist in the system
	 * 
	 * @param email
	 * @return boolean
	 */
	boolean existsByEmail(String email);
	
	/**
	 * This derived query function purpose is to check if there is another customer with the same email address as the new customer's email address
	 * 
	 * @param id
	 * @param email
	 * @return boolean
	 */
	boolean existsByIdNotLikeAndEmail(Long id, String email);
	
	/**
	 * This derived query function returns a customer by compatible email and password when logging in
	 * 
	 * @param email
	 * @param password
	 * @return Optional<Customer>
	 */
	Optional<Customer> findByEmailAndPassword(String email, String password);
}
