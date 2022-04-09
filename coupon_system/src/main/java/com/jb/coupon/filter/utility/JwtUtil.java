package com.jb.coupon.filter.utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import com.jb.coupon.exception.ExpiredTokenException;
import com.jb.coupon.exception.LoginFailedException;
import com.jb.coupon.service.model.LoginResponse;
import com.jb.coupon.service.model.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
public class JwtUtil {

	/**
	 * Signature algorithm field - type of encryption
	 */
	private String signatureAlgorithm = SignatureAlgorithm.HS256.getJcaName();

	/**
	 * Encoded secret key field - our private key
	 */
	private String encodedSecretKey = "this+is+my+key+and+it+must+be+at+least+256+bits+long";

	/**
	 * Decoded secret key field - creates our private key
	 */
	private Key decodedSecretKey = new SecretKeySpec(Base64.getDecoder().decode(encodedSecretKey), signatureAlgorithm);

	/**
	 * This method generates our key
	 * 
	 * @param userDetails - the user's details
	 * @return Token in String
	 */
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("clientType", userDetails.getClientType());
		claims.put("id", userDetails.getId());
		String myToken = createToken(claims, "" + userDetails.getId());
		return myToken;
	}

	/**
	 * This method creates the token
	 * 
	 * @param claims  - contains the fields which we are basing the token on
	 * @param subject - id -> id
	 * @return Token in String
	 */
	private String createToken(Map<String, Object> claims, String subject) {
		Instant now = Instant.now();
		/*
		 * Builder pattern builds a complex object using simple objects and using a step
		 * by step approach (Fluent API)
		 */
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(Date.from(now))
				.setExpiration(Date.from(now.plus(30, ChronoUnit.MINUTES))).signWith(this.decodedSecretKey).compact();
	}

	/**
	 * This method extracts the claims in JSON
	 * 
	 * @param token - the user's token
	 * @return Claims
	 * @throws ExpiredTokenException
	 */
	public Claims extractClaims(String token) throws ExpiredTokenException {
		try {
			JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(this.decodedSecretKey).build();
			System.out.println(jwtParser.parseClaimsJws(cleanToken(token)).getSignature());
			return jwtParser.parseClaimsJws(cleanToken(token)).getBody();
		} catch (ExpiredJwtException e) {
			throw new ExpiredTokenException();
		}
	}

	/**
	 * This method returns login response from the client
	 * 
	 * @param token - the user's token
	 * @return LoginResponse - the client's login response
	 */
	public LoginResponse getLoginResponse(String token) {
		String[] splitArray = token.split(" ");
		Claims claims = extractClaims(splitArray[1]);
		System.out.println(claims);
		Long id = Long.parseLong(claims.get("id").toString());
		String clientType = claims.get("clientType").toString().toLowerCase();
		LocalDateTime expiration = extractExpirationDate(token).toInstant().atZone(ZoneId.systemDefault())
				.toLocalDateTime();
		LoginResponse loginResponse = LoginResponse.builder().id(id).clientType(clientType).jwtToken(token)
				.expiration(expiration).build();
		return loginResponse;
	}

	/**
	 * This method extracts the expiration date of the token
	 * 
	 * @param token - the user's token
	 * @return the token's expiration date
	 */
	public Date extractExpirationDate(String token) {
		try {
			return extractClaims(token).getExpiration();
		} catch (ExpiredTokenException e) {
			return null;
		}
	}

	/**
	 * This method checks if the token is expired
	 * 
	 * @param token - the user's token
	 * @return boolean- if it's expired
	 */
	private boolean isTokenExpired(String token) {
		try {
			extractClaims(cleanToken(token));
			return false;
		} catch (ExpiredTokenException e) {
			return true;
		}
	}

	/**
	 * This method checks the validation of the user's details with the token
	 * 
	 * @param token - the user's token
	 * @return boolean - if the token is valid
	 */
	public boolean validateToken(String token) {
		token = token.split(" ")[1];
		return !isTokenExpired(cleanToken(token)); // validate signature
	}

	/**
	 * This method returns the token's headers
	 * 
	 * @param token - the user's token
	 * @return HttpHeaders
	 * @throws LoginFailedException
	 */
	public HttpHeaders getHeadres(String token) throws LoginFailedException {
		// Create new userDetails and ID
		UserDetails userDetails = new UserDetails();
		userDetails.setClientType((String) extractClaims(cleanToken(token)).get("clientType"));
		Long id = (Long) (extractClaims(cleanToken(token)).get("id"));
		userDetails.setId(id);
		// Send OK with header of new token
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.set("Autorization", "Bearer " + generateToken(userDetails));
		return httpHeaders;
	}

	/**
	 * This method cleans the token
	 * 
	 * @param token - the user's token
	 * @return String - cleaned token
	 */
	private String cleanToken(String token) {
		String[] cleanedToken = token.split(" ");
		if (cleanedToken.length > 1) {
			return cleanedToken[1];
		}
		return token;
	}
}
