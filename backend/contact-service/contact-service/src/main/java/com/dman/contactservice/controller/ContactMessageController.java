package com.dman.contactservice.controller;

import com.dman.contactservice.dto.ContactMessageRequest;
import com.dman.contactservice.dto.ContactMessageResponse;
import com.dman.contactservice.dto.StatusUpdateRequest;
import com.dman.contactservice.enums.MessageStatus;
import com.dman.contactservice.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contacto")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactMessageService service;

    // Endpoint público (formulario web envía aquí)
    @PostMapping
    public ResponseEntity<ContactMessageResponse> create(@Valid @RequestBody ContactMessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessageResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<ContactMessageResponse>> findByStatus(@PathVariable MessageStatus estado) {
        return ResponseEntity.ok(service.findByStatus(estado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactMessageResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ContactMessageResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(service.updateStatus(id, request.getEstado()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> stats() {
        return ResponseEntity.ok(service.getStats());
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("contact-service OK");
    }
}

