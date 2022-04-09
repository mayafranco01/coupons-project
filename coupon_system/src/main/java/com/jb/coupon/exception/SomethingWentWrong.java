package com.jb.coupon.exception;

public class SomethingWentWrong extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public SomethingWentWrong(String name) {
		super("Something went wrong in trying to get the " + name + " data");
	}
}
