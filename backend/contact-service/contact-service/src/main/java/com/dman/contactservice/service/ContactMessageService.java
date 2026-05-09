package com.dman.contactservice.service;

import com.dman.contactservice.dto.ContactMessageRequest;
import com.dman.contactservice.dto.ContactMessageResponse;
import com.dman.contactservice.entity.ContactMessage;
import com.dman.contactservice.enums.MessageStatus;
import com.dman.contactservice.exception.ResourceNotFoundException;
import com.dman.contactservice.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository repository;

    @Transactional
    public ContactMessageResponse create(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .telefono(request.getTelefono())
                .asunto(request.getAsunto())
                .mensaje(request.getMensaje())
                .estado(MessageStatus.PENDIENTE)
                .build();
        return toResponse(repository.save(message));
    }

    @Transactional(readOnly = true)
    public List<ContactMessageResponse> findAll() {
        return repository.findAllByOrderByFechaEnvioDesc()
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ContactMessageResponse> findByStatus(MessageStatus estado) {
        return repository.findByEstadoOrderByFechaEnvioDesc(estado)
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public ContactMessageResponse findById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Mensaje no encontrado con id: " + id));
    }

    @Transactional
    public ContactMessageResponse updateStatus(Long id, MessageStatus nuevoEstado) {
        ContactMessage message = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mensaje no encontrado con id: " + id));

        message.setEstado(nuevoEstado);

        if (nuevoEstado == MessageStatus.ATENDIDO && message.getFechaAtencion() == null) {
            message.setFechaAtencion(LocalDateTime.now());
        } else if (nuevoEstado == MessageStatus.PENDIENTE) {
            message.setFechaAtencion(null);
        }

        return toResponse(repository.save(message));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Mensaje no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getStats() {
        return Map.of(
                "total", repository.count(),
                "pendientes", repository.countByEstado(MessageStatus.PENDIENTE),
                "atendidos", repository.countByEstado(MessageStatus.ATENDIDO)
        );
    }

    private ContactMessageResponse toResponse(ContactMessage m) {
        return ContactMessageResponse.builder()
                .id(m.getId())
                .nombre(m.getNombre())
                .email(m.getEmail())
                .telefono(m.getTelefono())
                .asunto(m.getAsunto())
                .mensaje(m.getMensaje())
                .estado(m.getEstado())
                .fechaEnvio(m.getFechaEnvio())
                .fechaAtencion(m.getFechaAtencion())
                .build();
    }
}

