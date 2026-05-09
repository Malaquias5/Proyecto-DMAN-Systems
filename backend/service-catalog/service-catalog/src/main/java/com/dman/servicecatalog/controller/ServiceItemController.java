package com.dman.servicecatalog.controller;

import com.dman.servicecatalog.dto.ServiceItemRequest;
import com.dman.servicecatalog.dto.ServiceItemResponse;
import com.dman.servicecatalog.service.ServiceItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@RequiredArgsConstructor
public class ServiceItemController {

    private final ServiceItemService service;

    @PostMapping
    public ResponseEntity<ServiceItemResponse> create(@Valid @RequestBody ServiceItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    // Endpoint público para el frontend (solo activos)
    @GetMapping
    public ResponseEntity<List<ServiceItemResponse>> findAllActive() {
        return ResponseEntity.ok(service.findAllActive());
    }

    // Endpoint para admin (todos)
    @GetMapping("/all")
    public ResponseEntity<List<ServiceItemResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceItemResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceItemResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ServiceItemRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("service-catalog OK");
    }
}

