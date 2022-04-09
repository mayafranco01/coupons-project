package com.jb.coupon.exception;

import com.jb.coupon.model.Company;

public class CompanyNameInUseException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CompanyNameInUseException(Company company) {
		super("A company with the name " + company.getName() + " already exists");
	}
}
