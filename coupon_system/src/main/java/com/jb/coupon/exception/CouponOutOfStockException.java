package com.jb.coupon.exception;

import com.jb.coupon.model.Coupon;

public class CouponOutOfStockException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CouponOutOfStockException(Coupon coupon) {
		super("Quantity in stock: " + coupon.getAmount() + " coupons left from the coupon " + coupon.getTitle());
	}
}
