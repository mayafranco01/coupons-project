package com.jb.coupon.exception;

public class NotExistException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public NotExistException(String name, Object object) {
		super("The " + name + " " + object + " not found");
	}
	
	public NotExistException(String message) {
		super(message);
	}
}