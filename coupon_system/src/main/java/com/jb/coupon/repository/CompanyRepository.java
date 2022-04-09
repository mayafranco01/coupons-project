package com.jb.coupon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jb.coupon.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

	/**
	 * This derived query function checks if there is another company with the same email address as the new company's email address
	 * 
	 * @param email
	 * @param id
	 * @return boolean
	 */
	boolean existsByEmailIgnoreCaseAndIdNotLike(String email, Long id);

	/**
	 * This derived query function purpose is to check if there is another company in the system with the same name when adding a company
	 * because it impossible to add a company with a name that already exists
	 * 
	 * @param name
	 * @return boolean
	 */
	boolean existsByName(String name);
	
	/**
	 * This derived query function checks if the email address is exist in the system when trying to log in and also
	 * checks if there is another company in the system with the same email address when adding a company
	 * because it impossible to add a company with an email address that already exists
	 * 
	 * @param email
	 * @return boolean
	 */
	boolean existsByEmail(String email);
	
	/**
	 * This derived query function returns a company by compatible email and password when logging in
	 * 
	 * @param email
	 * @param password
	 * @return Optional<Company>
	 */
	Optional<Company> findByEmailAndPassword(String email, String password);
}
