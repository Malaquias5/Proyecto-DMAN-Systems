package com.dman.clientservice.repository;

import com.dman.clientservice.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findAllByOrderByFechaRegistroDesc();
    List<Client> findByServicio(String servicio);
}

