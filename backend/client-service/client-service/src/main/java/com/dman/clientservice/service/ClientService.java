package com.dman.clientservice.service;

import com.dman.clientservice.dto.ClientRequest;
import com.dman.clientservice.dto.ClientResponse;
import com.dman.clientservice.entity.Client;
import com.dman.clientservice.exception.ResourceNotFoundException;
import com.dman.clientservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    @Transactional
    public ClientResponse create(ClientRequest request) {
        Client client = Client.builder()
                .nombre(request.getNombre())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .servicio(request.getServicio())
                .mensaje(request.getMensaje())
                .build();

        Client saved = clientRepository.save(client);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ClientResponse> findAll() {
        return clientRepository.findAllByOrderByFechaRegistroDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClientResponse findById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));
        return toResponse(client);
    }

    @Transactional(readOnly = true)
    public List<ClientResponse> findByServicio(String servicio) {
        return clientRepository.findByServicio(servicio)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void delete(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente no encontrado con id: " + id);
        }
        clientRepository.deleteById(id);
    }

    private ClientResponse toResponse(Client client) {
        return ClientResponse.builder()
                .id(client.getId())
                .nombre(client.getNombre())
                .telefono(client.getTelefono())
                .email(client.getEmail())
                .servicio(client.getServicio())
                .mensaje(client.getMensaje())
                .fechaRegistro(client.getFechaRegistro())
                .build();
    }
}

