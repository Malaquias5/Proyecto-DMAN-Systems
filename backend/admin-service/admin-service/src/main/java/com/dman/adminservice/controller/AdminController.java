package com.dman.adminservice.controller;

import com.dman.adminservice.dto.*;
import com.dman.adminservice.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // ========== DASHBOARD ==========
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    // ========== CLIENTES ==========
    @GetMapping("/clientes")
    public ResponseEntity<List<ClientDto>> getAllClients() {
        return ResponseEntity.ok(adminService.getAllClients());
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getClientById(id));
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        adminService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    // ========== MENSAJES ==========
    @GetMapping("/mensajes")
    public ResponseEntity<List<ContactMessageDto>> getAllMessages() {
        return ResponseEntity.ok(adminService.getAllMessages());
    }

    @GetMapping("/mensajes/{id}")
    public ResponseEntity<ContactMessageDto> getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getMessageById(id));
    }

    @GetMapping("/mensajes/estado/{estado}")
    public ResponseEntity<List<ContactMessageDto>> getMessagesByStatus(@PathVariable String estado) {
        return ResponseEntity.ok(adminService.getMessagesByStatus(estado.toUpperCase()));
    }

    @PatchMapping("/mensajes/{id}/estado")
    public ResponseEntity<ContactMessageDto> updateMessageStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateDto request) {
        return ResponseEntity.ok(adminService.updateMessageStatus(id, request));
    }

    @DeleteMapping("/mensajes/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        adminService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }

    // ========== HEALTH ==========
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("admin-service OK");
    }
}

