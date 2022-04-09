package com.jb.coupon.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ClientIdPayload {
	@Getter
	private Long id;

	@Override
	public String toString() {
		return "ClientIdPayload [id=" + id + "]";
	}
}