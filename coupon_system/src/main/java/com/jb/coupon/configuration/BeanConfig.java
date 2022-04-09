package com.jb.coupon.configuration;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.jb.coupon.model.Category;
import com.jb.coupon.model.CategoryEnum;
import com.jb.coupon.model.Company;
import com.jb.coupon.model.Coupon;
import com.jb.coupon.model.Customer;
import com.jb.coupon.repository.CategoryRepository;
import com.jb.coupon.repository.CompanyRepository;
import com.jb.coupon.repository.CouponRepository;
import com.jb.coupon.repository.CustomerRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Configuration
public class BeanConfig {
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CouponRepository couponRepository;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private CategoryRepository categoryRepository;
		
	@Bean
	public void initializeDb() {
		/*
		 * Initialize companies & coupons
		 */
		
		/*
		 * YOM-TOV delicatessen & takeaway coupons
		 */
		Company yomTovDeli = Company.builder().name("Yom-Tov Deli").email("yomtov@deli.com").password("yomtov").build();
		companyRepository.save(yomTovDeli);
		Category foodCategory = Category.builder().id(CategoryEnum.FOOD.getCode()).name(CategoryEnum.FOOD).build();
		categoryRepository.save(foodCategory);
		Coupon picnicCoupon = Coupon.builder().company(yomTovDeli).category(foodCategory)
				.title("Romantic picnic basket").description("Fine cheeses, a bottle of Chablis wine, crackers, a mix of olives and grandma's marzipan")
				.startDate(LocalDate.of(2021, 10, 10)).endDate(LocalDate.of(2022, 4, 22)).amount(586).price(170.0)
				.image("picnic_basket.jpg").build();
		couponRepository.save(picnicCoupon);
		Coupon familyPackageCoupon = Coupon.builder().company(yomTovDeli).category(foodCategory)
				.title("Family package").description("Fine cheeses, two bottles of Chardonnay wine, crackers and stuffed dried figs")
				.startDate(LocalDate.of(2021, 11, 1)).endDate(LocalDate.of(2022, 4, 22)).amount(422).price(310.0)
				.image("family_package.jpg").build();
		couponRepository.save(familyPackageCoupon);
		yomTovDeli.setCoupons(List.of(picnicCoupon, familyPackageCoupon));
		companyRepository.save(yomTovDeli);
		
		/*
		 * OUZERIA restaurant & meal coupons
		 */
		Company ouzeria = Company.builder().name("Ouzeria").email("ouzeria@restaurant.com").password("ouzeria").build();
		companyRepository.save(ouzeria);
		Category restaurantCategory = Category.builder().id(CategoryEnum.RESTAURANT.getCode()).name(CategoryEnum.RESTAURANT).build();
		categoryRepository.save(restaurantCategory);
		Coupon vegetarianBusinessCoupon = Coupon.builder().company(ouzeria).category(restaurantCategory)
				.title("Vegetarian business").description("Appetizer, main course and dessert")
				.startDate(LocalDate.of(2021, 10, 1)).endDate(LocalDate.of(2022, 2, 28)).amount(165).price(120.0)
				.image("vegetarian-business.jpg").build();
		couponRepository.save(vegetarianBusinessCoupon);
		Coupon dinnerForCoupleCoupon = Coupon.builder().company(ouzeria).category(restaurantCategory)
				.title("Dinner for a couple").description("Two appetizers, two main courses, two glasses of house wine and one dessert")
				.startDate(LocalDate.of(2021, 11, 1)).endDate(LocalDate.of(2022, 1, 22)).amount(200).price(400.0)
				.image("dinner_for_couple.jpg").build();
		couponRepository.save(dinnerForCoupleCoupon);
		ouzeria.setCoupons(List.of(vegetarianBusinessCoupon, dinnerForCoupleCoupon));
		companyRepository.save(ouzeria);
		
		/*
		 * ZIM & a shipment coupon
		 */
		Company fedex = Company.builder().name("Fedex").email("fedex@fedex.com").password("fedex12").build();
		companyRepository.save(fedex);
		Category shoppingCategory = Category.builder().id(CategoryEnum.SHOPPING.getCode()).name(CategoryEnum.SHOPPING).build();
		categoryRepository.save(shoppingCategory);
		Coupon homeDelivery = Coupon.builder().company(fedex).category(shoppingCategory)
				.title("Door-to-door service").description("Shop online and get it to ypur home")
				.startDate(LocalDate.of(2021, 2, 10)).endDate(LocalDate.of(2022, 12, 22)).amount(3864).price(200.0)
				.image("home_delivery.png").build();
		couponRepository.save(homeDelivery);
		fedex.setCoupons(List.of(homeDelivery));
		companyRepository.save(fedex);
		
		/*
		 * HABIMA & show coupons
		 */
		Company habima = Company.builder().name("Habima").email("habima@habima.com").password("habima").build();
		companyRepository.save(habima);
		Category cultureCategory = Category.builder().id(CategoryEnum.CULTURE.getCode()).name(CategoryEnum.CULTURE).build();
		List<Coupon> habimaCoupons = new ArrayList<>();
		categoryRepository.save(cultureCategory);
		Coupon spanishOrchard = Coupon.builder().company(habima).category(cultureCategory)
				.title("Spanish Orchard")
				.description("New version of the long-running play that has played for over 20 years")
				.startDate(LocalDate.of(2021, 2, 9)).endDate(LocalDate.of(2022, 12, 9)).amount(76).price(90.0)
				.image("spanish_orchard.jpg").build();
		habimaCoupons.add(spanishOrchard);
		couponRepository.save(spanishOrchard);
		Coupon perfectStrangers = Coupon.builder().company(habima).category(cultureCategory)
				.title("Perfect Strangers")
				.description("A play based on italian director Paolo Genovese's successful and acclaimed film")
				.startDate(LocalDate.of(2021, 9, 9)).endDate(LocalDate.of(2022, 11, 3)).amount(250).price(80.0)
				.image("perfect_strangers.jpg").build();
		habimaCoupons.add(perfectStrangers);
		couponRepository.save(perfectStrangers);
		Coupon zorbaTheGreek = Coupon.builder().company(habima).category(cultureCategory)
				.title("Zoraba The Greek")
				.description("A play based on a novel written by the Cretan author Nikos Kazantzakis")
				.startDate(LocalDate.of(2021, 10, 9)).endDate(LocalDate.of(2022, 10, 7)).amount(320).price(75.0)
				.image("zorba_the_greek.jpg").build();
		habimaCoupons.add(zorbaTheGreek);
		couponRepository.save(zorbaTheGreek);
		Coupon mammaMia = Coupon.builder().company(habima).category(cultureCategory)
				.title("Mamma Mia")
				.description(
						"A jukebox musical written by British playwright Catherine Johnson, based on the songs of ABBA")
				.startDate(LocalDate.of(2021, 2, 9)).endDate(LocalDate.of(2022, 10, 11)).amount(290).price(150.0)
				.image("mamma_mia.jpg").build();
		habimaCoupons.add(mammaMia);
		couponRepository.save(mammaMia);
		habima.setCoupons(habimaCoupons);
		companyRepository.save(habima);
		
		/*
		 * AMSALEM TOURS & vacation coupons
		 */
		Company amsalemTours = Company.builder().name("Amsalem Tours").email("amsalem@tours.com").password("amsalem").build();
		companyRepository.save(amsalemTours);
		List<Coupon> amsalemToursCoupons = new ArrayList<>();
		Category vacationCategory = Category.builder().id(CategoryEnum.VACATION.getCode()).name(CategoryEnum.VACATION).build();
		categoryRepository.save(vacationCategory);
		Coupon vacationToDenmark = Coupon.builder().company(amsalemTours).category(vacationCategory)
				.title("Vacation to Denmark").description("Enjoy 3 days of nordic magic trip")
				.startDate(LocalDate.of(2021, 7, 12)).endDate(LocalDate.of(2022, 9, 16)).amount(540).price(2000.0)
				.image("copenhagen-denmark.jpg").build();
		amsalemToursCoupons.add(vacationToDenmark);
		couponRepository.save(vacationToDenmark);
		Coupon vacationToParis = Coupon.builder().company(amsalemTours).category(vacationCategory)
				.title("Vacation to Paris").description("The City of Lights is waiting for you")
				.startDate(LocalDate.of(2021, 9, 10)).endDate(LocalDate.of(2022, 12, 2)).amount(420).price(1900.0)
				.image("paris.webp").build();
		amsalemToursCoupons.add(vacationToParis);
		couponRepository.save(vacationToParis);
		Coupon vacationToGreece = Coupon.builder().company(amsalemTours).category(vacationCategory)
				.title("Vacation to Greece").description("Explore the ancient westren culture")
				.startDate(LocalDate.of(2021, 2, 10)).endDate(LocalDate.of(2022, 12, 22)).amount(245).price(1300.0)
				.image("greece.jpg").build();
		amsalemToursCoupons.add(vacationToGreece);
		couponRepository.save(vacationToGreece);
		Coupon vacationToLondon = Coupon.builder().company(amsalemTours).category(vacationCategory)
				.title("Vacation to London").description("Four days at a five-star hotel in London")
				.startDate(LocalDate.of(2021, 2, 10)).endDate(LocalDate.of(2022, 10, 26)).amount(45).price(2700.0)
				.image("london.jpg").build();
		amsalemToursCoupons.add(vacationToLondon);
		couponRepository.save(vacationToLondon);
		
		amsalemTours.setCoupons(amsalemToursCoupons);
		companyRepository.save(amsalemTours);
		
		/*
		 * HILTON & a spa coupon
		 */
		Company hilton = Company.builder().name("Hilton").email("hilton@hilton.com").password("hilton").build();
		companyRepository.save(hilton);
		Category spaCategory = Category.builder().id(CategoryEnum.SPA.getCode()).name(CategoryEnum.SPA).build();
		categoryRepository.save(spaCategory);
		Coupon hiltonSpaDeal = Coupon.builder().company(hilton).category(spaCategory)
				.title("Spa relaxtion")
				.description("a treat day at the spa including massage and breakfast")
				.startDate(LocalDate.of(2021, 2, 10)).endDate(LocalDate.of(2022, 12, 22)).amount(439).price(500.0)
				.image("hilton-spa.jpg").build();
		couponRepository.save(hiltonSpaDeal);
		hilton.setCoupons(List.of(hiltonSpaDeal));
		companyRepository.save(hilton);
		
		/*
		 * TEVA & a baby products coupon
		 */
		Company teva = Company.builder().name("Teva").email("teva@teva.com").password("teva76").build();
		companyRepository.save(teva);
		Category healthCategory = Category.builder().id(CategoryEnum.HEALTH.getCode()).name(CategoryEnum.HEALTH).build();
		categoryRepository.save(healthCategory);
		Coupon babyProducts = Coupon.builder().company(teva).category(healthCategory)
				.title("Baby products at 35% discount")
				.description("NUTRILON and ADINOL for your baby at very affordable prices")
				.startDate(LocalDate.of(2021, 2, 10)).endDate(LocalDate.of(2022, 2, 22)).amount(876).price(35.0)
				.image("baby_products.jpg").build();
		couponRepository.save(babyProducts);
		teva.setCoupons(List.of(babyProducts));
		companyRepository.save(teva);
		
		/*
		 * TZUR ELECTRICITY & gaming chair and webcam coupons
		 */
		Company tzurElectricity  = Company.builder().name("Tzur Electricity").email("tzur@electric.com").password("tzurele").build();
		companyRepository.save(tzurElectricity);
		Category electricityCategory = Category.builder().id(CategoryEnum.ELECTRICITY.getCode()).name(CategoryEnum.ELECTRICITY).build();
		categoryRepository.save(electricityCategory);
		Coupon gamingChair = Coupon.builder().company(tzurElectricity).category(electricityCategory)
				.title("Gaming chair")
				.description("Chair in an innovative ergonomic design, combined with a firm and extremely strong breathable fabric for only 400 NIS")
				.startDate(LocalDate.of(2021, 12, 10)).endDate(LocalDate.of(2022, 12, 22)).amount(72).price(400.0)
				.image("gaming_chair.jpeg").build();
		couponRepository.save(gamingChair);
		Coupon webcam = Coupon.builder().company(tzurElectricity).category(electricityCategory)
				.title("Pro webcam FHD 1080p")
				.description("Professional video camera with FULL HD 1080p image quality for only 120 NIS")
				.startDate(LocalDate.of(2021, 10, 5)).endDate(LocalDate.of(2022, 5, 13)).amount(400).price(120.0)
				.image("webcam.png").build();
		couponRepository.save(webcam);
		tzurElectricity.setCoupons(List.of(gamingChair, webcam));
		companyRepository.save(tzurElectricity);
		
		/*
		 * ENERGYM & spinning bike and professional weights coupons
		 */
		Company energym = Company.builder().name("Energym").email("energym@gmail.com").password("energym").build();
		companyRepository.save(energym);
		Category sportCategory = Category.builder().id(CategoryEnum.SPORT.getCode()).name(CategoryEnum.SPORT).build();
		categoryRepository.save(sportCategory);
		Coupon spinningBike = Coupon.builder().company(energym).category(sportCategory)
				.title("Spinnig bike")
				.description("Ergonomic bikes with biomechanics that simulate real riding in the field alongside safety and comfort in every pedal")
				.startDate(LocalDate.of(2021, 11, 1)).endDate(LocalDate.of(2022, 8, 13)).amount(160).price(6000.0)
				.image("spinning_bike.jpg").build();
		couponRepository.save(spinningBike);
		Coupon professionalWeights = Coupon.builder().company(energym).category(sportCategory)
				.title("Professional weights")
				.description("Weights with an accurate, high-quality finish that come with a comfortable, rough handle for increased safety")
				.startDate(LocalDate.of(2021, 9, 11)).endDate(LocalDate.of(2022, 5, 28)).amount(350).price(100.0)
				.image("weights.jpg").build();
		couponRepository.save(professionalWeights);
		energym.setCoupons(List.of(spinningBike, professionalWeights));
		companyRepository.save(energym);
		
		/*
		 * KIBBUTZ ALUMOT HEALTH FARM & a juice fasting detox retreats coupon
		 */
		Company kibbutzAlumot = Company.builder().name("Kibbutz Alumot Health Farm").email("alumot@farm.com").password("alumot").build();
		companyRepository.save(kibbutzAlumot);
		Category lifestyleCategory = Category.builder().id(CategoryEnum.LIFESTYLE.getCode()).name(CategoryEnum.LIFESTYLE).build();
		categoryRepository.save(lifestyleCategory);
		Coupon juiceFasting = Coupon.builder().company(kibbutzAlumot).category(lifestyleCategory)
				.title("Juice fasting detox retreat")
				.description("Juice fasting detox retreats feature yoga & meditation therapies")
				.startDate(LocalDate.of(2021, 1, 1)).endDate(LocalDate.of(2022, 2, 13)).amount(210).price(4200.0)
				.image("juice_fasting.jpg").build();
		couponRepository.save(juiceFasting);
		kibbutzAlumot.setCoupons(List.of(juiceFasting));
		companyRepository.save(kibbutzAlumot);
		
		/*
		 * Initialize customers
		 */
		Customer hadas = Customer.builder().firstName("Hadas").lastName("Levy").email("hadas@outlook.com")
				.password("hadaslevy").coupons(List.of(hiltonSpaDeal, vacationToDenmark, perfectStrangers, professionalWeights)).build();
		customerRepository.save(hadas);
		
		Customer mor = Customer.builder().firstName("Mor").lastName("Dayan")
				.email("mor@yahoo.com").password("mordayan").coupons(List.of(spanishOrchard, dinnerForCoupleCoupon, zorbaTheGreek)).build();
		customerRepository.save(mor);
		
		Customer shir = Customer.builder().firstName("Shir").lastName("Cohen").email("shir@gmail.com")
				.password("shircohen").coupons(List.of(picnicCoupon, vacationToParis, hiltonSpaDeal, gamingChair)).build();
		customerRepository.save(shir);
		
		Customer yael = Customer.builder().firstName("Yael").lastName("Liberman").email("yael@outlook.com")
				.password("liberman").coupons(List.of(mammaMia, vacationToGreece, webcam, babyProducts)).build();
		customerRepository.save(yael);
		
		Customer dina = Customer.builder().firstName("Dina").lastName("Vaknin").email("dina@gmail.com")
				.password("vaknin").coupons(List.of(homeDelivery, vegetarianBusinessCoupon, spinningBike)).build();
		customerRepository.save(dina);
		
		Customer rotem = Customer.builder().firstName("Rotem").lastName("Maimon").email("rotem@yahoo.com")
				.password("maimon").coupons(List.of(familyPackageCoupon, vacationToLondon, juiceFasting)).build();
		customerRepository.save(rotem);
	}	
}
