package com.jb.coupon.cors;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		/*
		 * OPTIONS request- the browser checks with the server whether the request is allowed. Only if the request is allowed, it’ll actually perform it.
		 */
		registry.addMapping("/**").allowedMethods("PUT", "DELETE", "POST", "GET", "OPTIONS").allowedOrigins("*");

	}
}
