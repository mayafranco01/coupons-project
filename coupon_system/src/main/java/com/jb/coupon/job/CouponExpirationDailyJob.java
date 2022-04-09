package com.jb.coupon.job;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jb.coupon.exception.SomethingWentWrong;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.repository.CouponRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
class CouponExpirationDailyJob {
	
	private CouponRepository couponRepository;

	/*
	 * This function removeExpiredCoupon() job is to schedule a run which goes over
	 * a list and checks the coupons in it every day (86400000 milliseconds) and if
	 * date passes it deletes them
	 */
	@Transactional(readOnly = false)
	@Scheduled(fixedRate = 60000 * 60 * 24, initialDelay = 15000)
	public void removeExpiredCoupon() {
		System.out.println("\r\n" + " +-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+\r\n"
				+ " |C|o|u|p|o|n| |e|x|p|i|r|a|t|i|o|n| |d|a|i|l|y| |j|o|b|\r\n"
				+ " +-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+\r\n" + "");

		LocalDateTime localDateTime = LocalDateTime.now();
		String currentTime = localDateTime.getHour() + ":" + localDateTime.getMinute() + ":"
				+ localDateTime.getSecond();
		try {
			Optional<List<Coupon>> expiredCoupons = couponRepository.findByEndDateBefore(localDateTime.toLocalDate());
			expiredCoupons.ifPresentOrElse((coupons) -> {
				System.out.println("The time now is " + currentTime + " and the following expired coupons are deleted:");
				System.out.println(expiredCoupons);
				for (Coupon coupon : coupons) {
					couponRepository.deleteById(coupon.getId());
				}
			}, () -> {
				new SomethingWentWrong("expired coupons by the current date"
						+ localDateTime.toLocalDate() + " during the coupon expiration dalily job");
			});
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
