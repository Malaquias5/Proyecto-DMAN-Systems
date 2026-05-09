package com.dman.adminservice.client;

import com.dman.adminservice.dto.ContactMessageDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "contact-service")
public interface ContactServiceClient {

    @GetMapping("/api/contacto")
    List<ContactMessageDto> findAll();

    @GetMapping("/api/contacto/{id}")
    ContactMessageDto findById(@PathVariable Long id);

    @GetMapping("/api/contacto/estado/{estado}")
    List<ContactMessageDto> findByStatus(@PathVariable String estado);

    @PatchMapping("/api/contacto/{id}/estado")
    ContactMessageDto updateStatus(@PathVariable Long id, @RequestBody com.dman.adminservice.dto.StatusUpdateDto request);

    @DeleteMapping("/api/contacto/{id}")
    void delete(@PathVariable Long id);

    @GetMapping("/api/contacto/stats")
    Map<String, Long> getStats();
}
