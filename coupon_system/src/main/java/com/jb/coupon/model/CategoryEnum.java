package com.jb.coupon.model;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.jb.coupon.exception.InvalidDetailsException;

public enum CategoryEnum {

	@Enumerated(EnumType.STRING)
	FOOD(1), ELECTRICITY(2), RESTAURANT(3), VACATION(4), BEAUTY(5), SPA(6), SHOPPING(7), CULTURE(8), HEALTH(9),
	LIFESTYLE(10), SPORT(11);

	private Integer code;

	/**
	 * Parameterized constructor
	 * 
	 * @param i
	 */
	CategoryEnum(Integer i) {
		this.code = i;
	}

	/**
	 * @return Integer
	 */
	public Integer getCode() {
		return code;
	}

	/**
	 * @param code
	 * @return Category
	 */
	public static CategoryEnum getCategory(Integer code) {
		switch (code) {
		case 1:
			return CategoryEnum.FOOD;
		case 2:
			return CategoryEnum.ELECTRICITY;
		case 3:
			return CategoryEnum.RESTAURANT;
		case 4:
			return CategoryEnum.VACATION;
		case 5:
			return CategoryEnum.BEAUTY;
		case 6:
			return CategoryEnum.SPA;
		case 7:
			return CategoryEnum.SHOPPING;
		case 8:
			return CategoryEnum.CULTURE;
		case 9:
			return CategoryEnum.HEALTH;
		case 10:
			return CategoryEnum.LIFESTYLE;
		case 11:
			return CategoryEnum.SPORT;
		default:
			throw new InvalidDetailsException("Code " + code + " is not supported");
		}
	}
}
