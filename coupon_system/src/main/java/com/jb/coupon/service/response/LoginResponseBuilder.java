package com.jb.coupon.service.response;

import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jb.coupon.exception.utility.NullUtil;
import com.jb.coupon.filter.utility.JwtUtil;
import com.jb.coupon.service.model.LoginResponse;
import com.jb.coupon.service.model.UserDetails;

@Component
public class LoginResponseBuilder {
	@Autowired
	private NullUtil nullUtil;
	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * This method creates the token
	 * 
	 * @param id
	 * @param clientType
	 * @return LoginResponse
	 */
	public LoginResponse build(Long id, String clientType) {
		nullUtil.validate(id, "user ID");
		nullUtil.validate(clientType, "client type");
		UserDetails userDetails = new UserDetails(id, clientType.toString().toLowerCase());
		String jwtToken = jwtUtil.generateToken(userDetails);
		LocalDateTime expiration = jwtUtil.extractExpirationDate(jwtToken).toInstant().atZone(ZoneId.systemDefault())
				.toLocalDateTime();
		LoginResponse loginResponse = LoginResponse.builder().id(id)
				.clientType(clientType.toString().toLowerCase()).jwtToken(jwtToken).expiration(expiration)
				.build();
		return loginResponse;
	}
}
