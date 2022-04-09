package com.jb.coupon.exception;

public class LoginFailedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public LoginFailedException(Object user) {
		super(user + " login failed");
	}
	
	public LoginFailedException() {
		super("Login failed");
	}
}
