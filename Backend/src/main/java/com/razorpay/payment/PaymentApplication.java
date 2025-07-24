package com.razorpay.payment;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class PaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentApplication.class, args);
	}
	
	@Bean
	@Profile("dev")
	CommandLineRunner devMethod() {
		return args -> {
			System.out.println("~~~~~~~  -----------------------  ~~~~~~~~");
			System.out.println("~~~~~~~  RUNNING FOR DEVELOPMENT  ~~~~~~~~");
			System.out.println("~~~~~~~  -----------------------  ~~~~~~~~");
		};
	}

	@Bean
	@Profile("prod")
	CommandLineRunner prodMethod() {
		return args -> {
			System.out.println("~~~~~~~  ----------------------  ~~~~~~~~");
			System.out.println("~~~~~~~  RUNNING FOR PRODUCTION  ~~~~~~~~");
			System.out.println("~~~~~~~  ----------------------  ~~~~~~~~");
		};
	}

}
