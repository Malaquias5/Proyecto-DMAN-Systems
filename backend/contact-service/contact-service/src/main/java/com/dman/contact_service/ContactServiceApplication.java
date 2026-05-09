package com.dman.contact_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.dman.contact_service", "com.dman.contactservice"})
@EnableJpaRepositories(basePackages = {"com.dman.contactservice.repository"})
@EntityScan(basePackages = {"com.dman.contactservice.entity"})
public class ContactServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactServiceApplication.class, args);
	}

}
