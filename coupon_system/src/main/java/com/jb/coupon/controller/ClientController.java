package com.jb.coupon.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.jb.coupon.controller.model.LoginPayload;
import com.jb.coupon.service.model.LoginResponse;

public abstract class ClientController {	
	public abstract ResponseEntity<LoginResponse> login(@RequestBody LoginPayload loginPayload);
	
//	public abstract ResponseEntity<LoginResponse> getSelf(@RequestHeader(value = "authorization") String token);
}
