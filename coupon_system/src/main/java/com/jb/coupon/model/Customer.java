package com.jb.coupon.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
	
	@Id
	/*
	 * GenerationType.IDENTITY generate a new value with each insert operation
	 */	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private Long id;	
	@Getter
	@Setter
	private String firstName;
	@Getter
	@Setter
	private String lastName;
	@Getter
	@Setter
	private String email;
	@Getter
	@Setter
	private String password;
	@Getter
	@Setter
	@ManyToMany
	@JoinTable(name = "customer_vs_coupon", joinColumns = {
			@JoinColumn(name = "customer_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "coupon_id", referencedColumnName = "id") })
	@JsonIgnore
	private List<Coupon> coupons;

	@Override
	public String toString() {
		return "Customer [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", password=" + password + "]";
	}
	
	public String toStringIncludeCouponList() {
		return "Customer [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", password=" + password + ", coupons=" + coupons + "]";
	}
}
