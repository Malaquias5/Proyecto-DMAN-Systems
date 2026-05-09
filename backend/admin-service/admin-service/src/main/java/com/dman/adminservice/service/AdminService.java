package com.dman.adminservice.service;

import com.dman.adminservice.client.ClientServiceClient;
import com.dman.adminservice.client.ContactServiceClient;
import com.dman.adminservice.dto.ClientDto;
import com.dman.adminservice.dto.ContactMessageDto;
import com.dman.adminservice.dto.DashboardDto;
import com.dman.adminservice.dto.StatusUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ClientServiceClient clientServiceClient;
    private final ContactServiceClient contactServiceClient;

    // ========== CLIENTES ==========
    public List<ClientDto> getAllClients() {
        return clientServiceClient.findAll();
    }

    public ClientDto getClientById(Long id) {
        return clientServiceClient.findById(id);
    }

    public void deleteClient(Long id) {
        clientServiceClient.delete(id);
    }

    // ========== MENSAJES ==========
    public List<ContactMessageDto> getAllMessages() {
        return contactServiceClient.findAll();
    }

    public ContactMessageDto getMessageById(Long id) {
        return contactServiceClient.findById(id);
    }

    public List<ContactMessageDto> getMessagesByStatus(String estado) {
        return contactServiceClient.findByStatus(estado);
    }

    public ContactMessageDto updateMessageStatus(Long id, StatusUpdateDto request) {
        return contactServiceClient.updateStatus(id, request);
    }

    public void deleteMessage(Long id) {
        contactServiceClient.delete(id);
    }

    // ========== DASHBOARD ==========
    public DashboardDto getDashboard() {
        long totalClientes = clientServiceClient.findAll().size();
        Map<String, Long> stats = contactServiceClient.getStats();

        return DashboardDto.builder()
                .totalClientes(totalClientes)
                .totalMensajes(stats.getOrDefault("total", 0L))
                .mensajesPendientes(stats.getOrDefault("pendientes", 0L))
                .mensajesAtendidos(stats.getOrDefault("atendidos", 0L))
                .build();
    }
}
