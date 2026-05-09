package com.dman.client_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.dman.client_service", "com.dman.clientservice"})
@EnableJpaRepositories(basePackages = {"com.dman.clientservice.repository"})
@EntityScan(basePackages = {"com.dman.clientservice.entity"})
public class ClientServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientServiceApplication.class, args);
	}

}
