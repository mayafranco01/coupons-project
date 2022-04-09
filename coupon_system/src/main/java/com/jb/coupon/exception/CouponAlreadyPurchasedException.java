package com.jb.coupon.exception;

import com.jb.coupon.model.Coupon;

public class CouponAlreadyPurchasedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CouponAlreadyPurchasedException(Coupon coupon) {
		super("You cannot purchase a coupon that you already have, the coupon " + coupon.getTitle()
				+ " has already been purchased");
	}
}
