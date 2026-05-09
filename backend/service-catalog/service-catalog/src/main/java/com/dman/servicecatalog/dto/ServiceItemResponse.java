package com.dman.servicecatalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceItemResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private String categoria;
    private String icono;
    private Boolean activo;
}

