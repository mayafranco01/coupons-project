package com.jb.coupon.exception.utility;

import java.util.regex.Pattern;

public class RegexUtil {

	/**
	 * Java Regex to define a pattern for email address
	 * 
	 * @param email
	 * @return boolean
	 */
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
			Pattern.CASE_INSENSITIVE);

	public static boolean isEmailValid(String email) {
		java.util.regex.Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
		return matcher.find();
	}
}
