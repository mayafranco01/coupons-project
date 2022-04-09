package com.jb.coupon.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jb.coupon.exception.CouponAlreadyExistsException;
import com.jb.coupon.exception.InvalidDetailsException;
import com.jb.coupon.exception.LoginFailedException;
import com.jb.coupon.exception.NotExistException;
import com.jb.coupon.exception.NullDetailsException;
import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.exception.utility.NullUtil;
import com.jb.coupon.model.Category;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.service.ClientService;
import com.jb.coupon.service.CompanyService;
import com.jb.coupon.service.model.ClientType;
import com.jb.coupon.service.model.LoginResponse;
import com.jb.coupon.service.model.UserDetails;
import com.jb.coupon.service.response.LoginResponseBuilder;
import com.jb.coupon.service.utility.LockUtil;

@Service
public class CompanyServiceImpl extends ClientService implements CompanyService {

	/**
	 * Class Attributes
	 */
	@Autowired
	private UserDetails userDetails;
	@Autowired
	private NullUtil nullUtil;
	@Autowired
	private LoginResponseBuilder loginResponseBuilder;

	@Override
	public LoginResponse login(String email, String password) {
		if (companyRepository.existsByEmail(email)) {
			Optional<Company> optionalCompany = companyRepository.findByEmailAndPassword(email, password);
			if (optionalCompany == null || optionalCompany.isEmpty()) {
				throw new InvalidDetailsException("password", password);
			} else {
				System.out.println("Comapny login succeded");
				Long companyId = optionalCompany.get().getId();
				String clientType = ClientType.COMPANY.toString().toLowerCase();
				userDetails = new UserDetails(companyId, clientType);
				LoginResponse loginResponse = loginResponseBuilder.build(companyId, clientType);
				if (loginResponse == null) {
					throw new LoginFailedException(clientType);
				}
				return loginResponse;
			}
		} else {
			throw new NotExistException("e-mail address", email);
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void addCoupon(Coupon coupon) {
		nullUtil.validate(coupon, "coupon");
		nullUtil.validate(coupon.getTitle(), "title");
		nullUtil.validate(coupon.getDescription(), "description");
		nullUtil.validate(coupon.getCategory(), "category");
		nullUtil.validate(coupon.getAmount(), "amount");
		nullUtil.validate(coupon.getPrice(), "price");
		nullUtil.validate(coupon.getImage(), "image");
		nullUtil.validate(coupon.getCompany().getId(), "company");
		if (coupon.getId() != null) {
			throw new InvalidDetailsException("There is no permission to add a coupon ID");
		}
		if (coupon.getCompany().getId() < 1) {
			throw new InvalidDetailsException("company", coupon.getCompany().getId());
		}
		if (coupon.getTitle().isEmpty()) {
			throw new InvalidDetailsException("title", coupon.getTitle());
		}
		if (coupon.getDescription().isEmpty()) {
			throw new InvalidDetailsException("description", coupon.getDescription());
		}
		if (coupon.getEndDate().isBefore(LocalDate.now())) {
			throw new InvalidDetailsException("The end date " + coupon.getEndDate() + " is expired");
		}
		if (coupon.getEndDate().isBefore(coupon.getStartDate())) {
			throw new InvalidDetailsException("The end date is before the start date");
		}
		/**
		 * This check allows to add amount of 0 in case the company doesn't want the
		 * customers to buy the coupons for now
		 */
		if (coupon.getAmount() < 0) {
			throw new InvalidDetailsException("amount", coupon.getAmount());
		}
		if (coupon.getPrice() < 0) {
			throw new InvalidDetailsException("price", coupon.getPrice());
		}
		if (coupon.getImage().isEmpty()) {
			throw new InvalidDetailsException("The image url is not valid");
		}
		/*
		 * Make sure that the ID of the company that is connected to the system and the
		 * ID of the company in the coupon is matched
		 */
		if (userDetails.getId() != coupon.getCompany().getId()) {
			throw new InvalidDetailsException("You cannot add this coupon to other company");
		}
		synchronized (LockUtil.coupon()) {
			/*
			 * Make sure there's no title add that already exists on another coupon for this
			 * company
			 */
			if ((couponRepository.findByCompanyIdAndTitleIgnoreCase(userDetails.getId(), coupon.getTitle()))
					.isPresent()) {
				throw new CouponAlreadyExistsException(coupon);
			}
			Optional<Company> optionalCompany = companyRepository.findById(userDetails.getId());
			Optional<List<Coupon>> optionalCompanyCoupons = couponRepository.findByCompanyId(userDetails.getId());
			if (optionalCompanyCoupons == null) {
				throw new SomethingWentWrong("the coupons");
			}
			coupon.setTitle(coupon.getTitle());
			optionalCompanyCoupons.get().add(coupon);
			optionalCompany.get().setCoupons(optionalCompanyCoupons.get());
			couponRepository.save(coupon);
			companyRepository.save(optionalCompany.get());
			/*
			 * If the category not exists in DB, this check adds it
			 */
			if (!categoryRepository.existsById(coupon.getCategory().getId())) {
				Category category = Category.builder().id(coupon.getCategory().getId())
						.name(coupon.getCategory().getName()).build();
				synchronized (LockUtil.coupon()) {
					categoryRepository.save(category);
				}
			}
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void updateCoupun(Coupon coupon) {
		nullUtil.validate(coupon, "coupon");
		nullUtil.validate(coupon.getTitle(), "title");
		nullUtil.validate(coupon.getDescription(), "description");
		nullUtil.validate(coupon.getCategory(), "category");
		nullUtil.validate(coupon.getAmount(), "amount");
		nullUtil.validate(coupon.getPrice(), "price");
		nullUtil.validate(coupon.getImage(), "image");
		if (coupon.getTitle().isEmpty()) {
			throw new InvalidDetailsException("title", coupon.getTitle());
		}
		if (coupon.getDescription().isEmpty()) {
			throw new InvalidDetailsException("description", coupon.getDescription());
		}
		if (coupon.getEndDate().isBefore(coupon.getStartDate())) {
			throw new InvalidDetailsException("The end date is before the start date");
		}
		if (coupon.getEndDate().isBefore(LocalDate.now())) {
			throw new InvalidDetailsException("The end date " + coupon.getEndDate() + " is expired");
		}
		/**
		 * This allows to add amount of 0 in case the company doesn't want the customers
		 * to buy the coupons for now
		 */
		if (coupon.getAmount() < 0) {
			throw new InvalidDetailsException("amount", coupon.getAmount());
		}
		if (coupon.getPrice() < 0) {
			throw new InvalidDetailsException("price", coupon.getPrice());
		}
		if (coupon.getImage().isEmpty()) {
			throw new InvalidDetailsException("The image url is not valid");
		}
		/*
		 * If the category is changed and not exists in DB, this check adds it
		 */
		Optional<Coupon> optionalCoupon = couponRepository.findById(coupon.getId());

		if (optionalCoupon.isEmpty()) {
			throw new NotExistException("You cannot edit a coupon which does not exist for the company");
		}
		if (!categoryRepository.existsById(coupon.getCategory().getId())) {
			Category category = Category.builder().id(coupon.getCategory().getId()).name(coupon.getCategory().getName())
					.build();
			categoryRepository.save(category);
		}
		/*
		 * Make sure there's no title update that already exists on another coupon for
		 * this company
		 */
		if (!optionalCoupon.get().getTitle().equalsIgnoreCase(coupon.getTitle())) {
			throw new CouponAlreadyExistsException(coupon);
		}
		synchronized (LockUtil.coupon()) {
			coupon.setTitle(coupon.getTitle());
			couponRepository.save(coupon);
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void deleteCoupon(Long couponId) {
		nullUtil.validate(couponId, "coupon");
		if (couponId < 1) {
			throw new InvalidDetailsException("coupon ", couponId);
		}
		if (!couponRepository.existsByIdAndCompanyId(couponId, userDetails.getId())) {
			throw new NotExistException(
					" The coupon is probably already deleted and does not exist");
		}
		couponRepository.deleteById(couponId);
	}

	@Override
	public Optional<List<Coupon>> getCompanyCoupons() {
		Optional<List<Coupon>> optinalCoupons = couponRepository.findByCompanyId(userDetails.getId());
		if (optinalCoupons == null) {
			throw new SomethingWentWrong("coupons");
		} else {
			return optinalCoupons;
		}
	}

	@Override
	public Optional<List<Coupon>> getCompanyCoupons(Integer categoryId) {
		nullUtil.validate(categoryId, "category");
		Optional<List<Coupon>> optionalCoupons = couponRepository.findByCompanyIdAndCategoryId(userDetails.getId(),
				categoryId);
		if (optionalCoupons == null) {
			throw new SomethingWentWrong("coupons");
		}
		System.out.println("These are the company coupons:\n" + optionalCoupons.get());
		return optionalCoupons;
	}

	@Override
	public Optional<List<Coupon>> getCompanyCoupons(Double maxPrice) {
		nullUtil.validate(maxPrice, "maximum price");
		if (maxPrice < 0) {
			throw new InvalidDetailsException("maximum price", maxPrice);
		}
		Optional<List<Coupon>> optionalCoupons = couponRepository
				.findByCompanyIdAndPriceLessThanEqual(userDetails.getId(), maxPrice);
		if (optionalCoupons == null) {
			throw new SomethingWentWrong("coupons");
		}
		System.out.println("These are the company's coupons: \n" + optionalCoupons);
		return optionalCoupons;
	}

	@Override
	public Optional<Company> getCompanyDetails() {
		Optional<Company> optionalCompany = companyRepository.findById(userDetails.getId());
		Optional<List<Coupon>> optionalCoupons = couponRepository.findByCompanyId(userDetails.getId());
		if (optionalCoupons.isPresent()) {
			optionalCompany.get().setCoupons(optionalCoupons.get());
		}
		System.out.println("These are the company details: [" + optionalCompany.get() + "]");
		return Optional
				.ofNullable(optionalCompany.orElseThrow(() -> new NotExistException("company ", userDetails.getId())));
	}

	@Override
	public Optional<Coupon> getOneCoupon(Long couponId)
			throws NullDetailsException, InvalidDetailsException, NotExistException {
		nullUtil.validate(couponId, "coupon");
		if (couponId < 1) {
			throw new InvalidDetailsException("coupon", couponId);
		}
		Optional<Coupon> optionalCoupon = couponRepository.findById(couponId);
		return Optional.ofNullable(
				optionalCoupon.orElseThrow(() -> new NotExistException("coupon ", optionalCoupon.get().getTitle())));
	}
}
