package com.jb.coupon.service.utility;

/**
 * Locking is used to prevent dirty reads (reading data that hasn't been
 * committed) and non-repeatable reads (reading data that gets deleted by
 * another transaction before the one reading is finished)
 */
public class LockUtil {

	private static LockUtil company = new LockUtil();
	private static LockUtil customer = new LockUtil();
	private static LockUtil coupon = new LockUtil();

	private LockUtil() {
	}

	public static LockUtil company() {
		return company;
	}
	
	public static LockUtil customer() {
		return customer;
	}
	
	public static LockUtil coupon() {
		return coupon;
	}
}
