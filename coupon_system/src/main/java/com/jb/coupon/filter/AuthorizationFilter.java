package com.jb.coupon.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.jb.coupon.filter.utility.JwtUtil;

public class AuthorizationFilter implements Filter {

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * Authorization Filter function gets the token, checks validation and if it
	 * expires and extracts a legible object from it
	 * 
	 * @param request
	 * @param response
	 * @param chain
	 * @throw IOException
	 * @throw ServletException
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String method = httpRequest.getMethod();
		System.out.println("doFilter/method/httpRequest " + method + " " + httpRequest.getRequestURL());

		if (method.equals("OPTIONS")) {
			chain.doFilter(httpRequest, httpResponse);
		} else {
			String token = httpRequest.getHeader("Authorization");
			try {
				jwtUtil.validateToken(token);
				jwtUtil.getHeadres(token);
				System.out.println("validation succeded");
			} catch (Exception e) {
				httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
			}
			chain.doFilter(httpRequest, httpResponse);
		}
	}
}
