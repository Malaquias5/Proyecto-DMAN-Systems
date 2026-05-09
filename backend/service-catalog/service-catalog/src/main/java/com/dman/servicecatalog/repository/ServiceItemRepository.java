package com.dman.servicecatalog.repository;

import com.dman.servicecatalog.entity.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    List<ServiceItem> findByActivoTrue();
    List<ServiceItem> findByCategoria(String categoria);
}

