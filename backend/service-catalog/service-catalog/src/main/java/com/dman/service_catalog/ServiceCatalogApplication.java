package com.dman.service_catalog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.dman.service_catalog", "com.dman.servicecatalog"})
@EnableJpaRepositories(basePackages = {"com.dman.servicecatalog.repository"})
@EntityScan(basePackages = {"com.dman.servicecatalog.entity"})
public class ServiceCatalogApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceCatalogApplication.class, args);
	}

}
