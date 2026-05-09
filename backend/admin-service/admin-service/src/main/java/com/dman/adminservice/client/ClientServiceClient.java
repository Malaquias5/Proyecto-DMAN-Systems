package com.dman.adminservice.client;

import com.dman.adminservice.dto.ClientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "client-service")
public interface ClientServiceClient {

    @GetMapping("/api/clientes")
    List<ClientDto> findAll();

    @GetMapping("/api/clientes/{id}")
    ClientDto findById(@PathVariable Long id);

    @DeleteMapping("/api/clientes/{id}")
    void delete(@PathVariable Long id);
}

