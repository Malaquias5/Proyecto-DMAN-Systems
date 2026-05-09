package com.dman.servicecatalog.service;

import com.dman.servicecatalog.dto.ServiceItemRequest;
import com.dman.servicecatalog.dto.ServiceItemResponse;
import com.dman.servicecatalog.entity.ServiceItem;
import com.dman.servicecatalog.exception.ResourceNotFoundException;
import com.dman.servicecatalog.repository.ServiceItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceItemService {

    private final ServiceItemRepository repository;

    @Transactional
    public ServiceItemResponse create(ServiceItemRequest request) {
        ServiceItem item = ServiceItem.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .categoria(request.getCategoria())
                .icono(request.getIcono())
                .activo(request.getActivo() == null ? true : request.getActivo())
                .build();
        return toResponse(repository.save(item));
    }

    @Transactional(readOnly = true)
    public List<ServiceItemResponse> findAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ServiceItemResponse> findAllActive() {
        return repository.findByActivoTrue().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public ServiceItemResponse findById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con id: " + id));
    }

    @Transactional
    public ServiceItemResponse update(Long id, ServiceItemRequest request) {
        ServiceItem item = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con id: " + id));

        item.setNombre(request.getNombre());
        item.setDescripcion(request.getDescripcion());
        item.setCategoria(request.getCategoria());
        item.setIcono(request.getIcono());
        if (request.getActivo() != null) {
            item.setActivo(request.getActivo());
        }
        return toResponse(repository.save(item));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Servicio no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    private ServiceItemResponse toResponse(ServiceItem item) {
        return ServiceItemResponse.builder()
                .id(item.getId())
                .nombre(item.getNombre())
                .descripcion(item.getDescripcion())
                .categoria(item.getCategoria())
                .icono(item.getIcono())
                .activo(item.getActivo())
                .build();
    }
}

