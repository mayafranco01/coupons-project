package com.jb.coupon.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jb.coupon.controller.model.ResponseDetails;
import com.jb.coupon.exception.CompanyNameInUseException;
import com.jb.coupon.exception.CouponAlreadyExistsException;
import com.jb.coupon.exception.CouponAlreadyPurchasedException;
import com.jb.coupon.exception.CouponOutOfStockException;
import com.jb.coupon.exception.EmailInUseException;
import com.jb.coupon.exception.ExpiredCouponException;
import com.jb.coupon.exception.ExpiredTokenException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.LoginFailedException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.exception.utility.CodeUtil;

@RestController
@ControllerAdvice
public class CouponExceptionHandler {

	@ExceptionHandler(LoginFailedException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ResponseDetails handleAuthenticationException(LoginFailedException loginFailedException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.LOGIN_FAILED.getCode())
				.message(loginFailedException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(ExpiredTokenException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ResponseDetails handleAuthenticationException(ExpiredTokenException expiredTokenException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.EXPIRED_TOKEN.getCode())
				.message(expiredTokenException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(EmailInUseException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public ResponseDetails handleCompanyException(EmailInUseException emailInUseException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.EMAIL_IN_USE.getCode())
				.message(emailInUseException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(CompanyNameInUseException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public ResponseDetails handleCompanyException(CompanyNameInUseException companyNameInUseException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.COMPANY_NAME_IN_USE.getCode())
				.message(companyNameInUseException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(CouponAlreadyExistsException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public ResponseDetails handleCouponException(CouponAlreadyExistsException couponAlreadyExistsException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.COUPON_ALREADY_EXISTS.getCode())
				.message(couponAlreadyExistsException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(ExpiredCouponException.class)
	@ResponseStatus(HttpStatus.GONE)
	public ResponseDetails handleCouponException(ExpiredCouponException expiredCouponException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.EXPIRED_COUPON.getCode())
				.message(expiredCouponException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(SomethingWentWrong.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseDetails handleCouponException(SomethingWentWrong somethingWentWrong) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.SOMETHING_WENT_WRONG.getCode())
				.message(somethingWentWrong.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(CouponOutOfStockException.class)
	@ResponseStatus(HttpStatus.OK)
	public ResponseDetails handleCouponException(CouponOutOfStockException couponOutOfStockException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.COUPON_OUT_OF_STOCK.getCode())
				.message(couponOutOfStockException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(CouponAlreadyPurchasedException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public ResponseDetails handlePurchaseException(CouponAlreadyPurchasedException couponAlreadyPurchasedException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.COUPON_ALREADY_PURCHASED.getCode())
				.message(couponAlreadyPurchasedException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(InvalidDetailsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseDetails handleValidationException(InvalidDetailsException invalidDetailsException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.INVALID_DETAILS.getCode())
				.message(invalidDetailsException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(NullDetailsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseDetails handleValidationException(NullDetailsException nullDetailsException) {
		ResponseDetails errorDetails = ResponseDetails.builder()// .object(nullDetailsException.getObject())
				.code(CodeUtil.NULL_DETAILS.getCode()).message(nullDetailsException.getMessage()).build();
		return errorDetails;
	}

	@ExceptionHandler(NotExistException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseDetails handleValidationException(NotExistException notExistException) {
		ResponseDetails errorDetails = ResponseDetails.builder().code(CodeUtil.NOT_EXIST.getCode())
				.message(notExistException.getMessage()).build();
		return errorDetails;
	}
}
