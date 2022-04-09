package com.jb.coupon.exception;

import com.jb.coupon.model.Coupon;

public class CouponAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CouponAlreadyExistsException(Coupon coupon) {
		super("The title " + coupon.getTitle() + " has already been used");
	}
}