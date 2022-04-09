package com.jb.coupon.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CategoryIdPayload {
	@Getter
	private Integer id;

	@Override
	public String toString() {
		return "CategoryIdPayload [id=" + id + "]";
	}
}
