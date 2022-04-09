package com.jb.coupon.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Company {
	
	@Id
	/*
	 * GenerationType.IDENTITY generate a new value with each insert operation
	 */
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private Long id;
	@Getter
	@Setter
	private String name;
	@Getter
	@Setter
	private String email;
	@Getter
	@Setter
	private String password;
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "company")
	@Singular
	@Getter
	@Setter
	@JsonIgnore
	private List<Coupon> coupons;

	public Company(String name, @NotEmpty String email, @NotEmpty String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "Company [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}

	public String toStringIncludeCouponList() {
		return "Company [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", coupons="
				+ coupons + "]";
	}
}
