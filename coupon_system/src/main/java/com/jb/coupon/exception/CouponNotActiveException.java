package com.jb.coupon.exception;

import com.jb.coupon.model.Coupon;

public class CouponNotActiveException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CouponNotActiveException(Coupon coupon) {
		super("Coupon cannot yet be redeemed, effective date is from " + coupon.getStartDate());
	}
}
