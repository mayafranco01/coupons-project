package com.jb.coupon.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.exception.utility.NullUtil;
import com.jb.coupon.model.Category;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.repository.CategoryRepository;
import com.jb.coupon.repository.CouponRepository;
import com.jb.coupon.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private NullUtil nullUtil;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private CouponRepository couponRepository;

	@Override
	public Optional<List<Category>> getAllCategories() throws SomethingWentWrong {
		Optional<List<Category>> optionalCategories = Optional.of(categoryRepository.findAll());
		if (optionalCategories == null) {
			throw new SomethingWentWrong("categories list");
		}
		return optionalCategories;
	}

	@Override
	public Optional<List<Coupon>> getCouponsByCategory(Integer categoryId)
			throws NullDetailsException, SomethingWentWrong {
		nullUtil.validate(categoryId, "category");
		Optional<List<Coupon>> optionalCoupons = couponRepository.findByCategoryId(categoryId);
		nullUtil.validate(optionalCoupons, "coupons");
		if (optionalCoupons == null) {
			throw new SomethingWentWrong("coupons");
		}
		return optionalCoupons;
	}
}
