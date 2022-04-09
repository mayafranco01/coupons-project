package com.jb.coupon.exception.utility;

import org.springframework.stereotype.Component;

import com.jb.coupon.exception.NullDetailsException;

@Component
public class NullUtil {
	
	public void validate(Object object) throws NullDetailsException {
		if (object == null) {
			throw new NullDetailsException();
		}
	}

	public void validate(Object object, String name) throws NullDetailsException {
		if (object == null) {
			throw new NullDetailsException(name);
		}
	}
}
