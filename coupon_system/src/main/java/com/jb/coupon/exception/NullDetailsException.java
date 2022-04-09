package com.jb.coupon.exception;

public class NullDetailsException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public NullDetailsException(String name) {
		super("The " + name + " is empty");
	}
	
	public NullDetailsException() {
		super("All fields must be filled in");
	}
}

