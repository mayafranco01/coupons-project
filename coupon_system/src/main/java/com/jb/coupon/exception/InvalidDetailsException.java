package com.jb.coupon.exception;

public class InvalidDetailsException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public InvalidDetailsException(String name, Object object) {
		super("The " + name + " " + object + " is invalid");
	}
	
	public InvalidDetailsException(String message) {
		super(message);
	}
}
