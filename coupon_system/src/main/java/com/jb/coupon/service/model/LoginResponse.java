package com.jb.coupon.service.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
	private Long id;
	private String clientType;
	private String jwtToken;
	private LocalDateTime expiration;
}
