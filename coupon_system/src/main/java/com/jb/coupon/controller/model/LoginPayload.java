package com.jb.coupon.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class LoginPayload {
	@Getter
	private String email;
	@Getter
	private String password;
	
	@Override
	public String toString() {
		return "LoginPayload [email=" + email + ", password=" + password + "]";
	}
}
