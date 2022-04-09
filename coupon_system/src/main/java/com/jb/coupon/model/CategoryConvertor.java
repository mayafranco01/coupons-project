package com.jb.coupon.model;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.jb.coupon.exception.InvalidDetailsException;

/*
 * The interface AttributeConverter is used to convert the category code into database column representation and back again
 */
@Converter(autoApply = true)
public class CategoryConvertor implements AttributeConverter<CategoryEnum, Integer> {

	@Override
	public Integer convertToDatabaseColumn(CategoryEnum category) {
		if (category == null) {
			return null;
		}
		return category.getCode();
	}

	@Override
	public CategoryEnum convertToEntityAttribute(Integer code) {
		if (code == null) {
			return null;
		}
		return Stream.of(CategoryEnum.values()).filter(c -> c.getCode().equals(code)).findFirst()
				.orElseThrow(() -> new InvalidDetailsException("This code " + code + " does not exist"));
	}
}
