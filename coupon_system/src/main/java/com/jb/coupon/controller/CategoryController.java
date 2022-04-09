package com.jb.coupon.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jb.coupon.controller.model.CategoryIdPayload;
import com.jb.coupon.model.Category;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.service.implementation.CategoryServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "coupons/")
public class CategoryController {

	@Autowired
	private CategoryServiceImpl categoryServiceImpl;

	/*
	 * Get all coupons by category
	 */
	@PostMapping(path = "category/coupons")
	public ResponseEntity<Optional<List<Coupon>>> getCouponsByCategory(
			@RequestBody CategoryIdPayload categoryIdPayload) {
		Optional<List<Coupon>> optionalCoupons = categoryServiceImpl.getCouponsByCategory(categoryIdPayload.getId());
		return ResponseEntity.status(HttpStatus.OK).body(optionalCoupons);
	}

	/*
	 * Get all categories
	 */
	@GetMapping(path = "categories")
	public ResponseEntity<Optional<List<Category>>> getCategories() {
		return ResponseEntity.ok(categoryServiceImpl.getAllCategories());
	}
}
