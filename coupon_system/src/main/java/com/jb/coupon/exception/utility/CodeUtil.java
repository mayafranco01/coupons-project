package com.jb.coupon.exception.utility;

public enum CodeUtil {
	COUPON_OUT_OF_STOCK(1), LOGIN_FAILED(2), EMAIL_IN_USE(3), COMPANY_NAME_IN_USE(4), COUPON_ALREADY_EXISTS(5), 
	EXPIRED_COUPON(6), COUPON_NOT_ACTIVE(7), SOMETHING_WENT_WRONG(8), COUPON_ALREADY_PURCHASED(9),
	INVALID_DETAILS(10), NOT_EXIST(11), NULL_DETAILS(12), EXPIRED_TOKEN(13);

	private int code;

	private CodeUtil(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}
}
