package com.jb.coupon.exception;

import com.jb.coupon.model.Coupon;

public class ExpiredCouponException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ExpiredCouponException(Coupon coupon) {
		super("The chosen coupon has expired on " + coupon.getEndDate());
	}
}
