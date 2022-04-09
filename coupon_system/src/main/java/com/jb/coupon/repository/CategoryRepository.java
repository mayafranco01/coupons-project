package com.jb.coupon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jb.coupon.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	/**
	 * This derived query function checks if a category already exists in the system
	 * before adding it
	 * 
	 * @param categoryId
	 * @return boolean
	 */
	boolean existsById(Integer categoryId);
}
