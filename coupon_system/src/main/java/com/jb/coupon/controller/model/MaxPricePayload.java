package com.jb.coupon.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class MaxPricePayload {
	@Getter
	private Double maxPrice;

	@Override
	public String toString() {
		return "MaxPricePayload [maxPrice=" + maxPrice + "]";
	}
}
