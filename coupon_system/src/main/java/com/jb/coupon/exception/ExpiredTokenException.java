package com.jb.coupon.exception;

public class ExpiredTokenException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ExpiredTokenException() {
		super("Your time in the system is up. You need re-login");
	}
}
