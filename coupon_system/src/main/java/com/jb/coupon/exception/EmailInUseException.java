package com.jb.coupon.exception;

public class EmailInUseException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public EmailInUseException(String email) {
		super("The e-mail address " + email + " already exists");
	}
}
