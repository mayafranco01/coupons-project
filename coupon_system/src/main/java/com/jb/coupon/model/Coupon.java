package com.jb.coupon.model;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Coupon {
	
	@Id
	/*
	 * GenerationType.IDENTITY generate a new value with each insert operation
	 */
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private Long id;
	@ManyToOne
	@Getter
	@Setter
	private Company company;
	@ManyToOne
	@Getter
	@Setter
	private Category category;
	@Getter
	@Setter
	private String title;
	@Getter
	@Setter
	private String description;
	@Getter
	@Setter
	private LocalDate startDate;
	@Getter
	@Setter
	private LocalDate endDate;
	@Getter
	@Setter
	private Integer amount;
	@Getter
	@Setter
	private Double price;
	@Getter
	@Setter
	private String image;
	@Getter
	@Setter
	@ManyToMany
	@JoinTable(name = "customer_vs_coupon", joinColumns = {
			@JoinColumn(name = "coupon_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "customer_id", referencedColumnName = "id") })
	@JsonIgnore
	private Set<Customer> customers;

	@Override
	public String toString() {
		return "Coupon [id=" + id + ", company=" + company + ", category=" + category + ", title=" + title
				+ ", description=" + description + ", startDate=" + startDate + ", endDate=" + endDate + ", amount="
				+ amount + ", price=" + price + ", image=" + image + "]";
	}
}
