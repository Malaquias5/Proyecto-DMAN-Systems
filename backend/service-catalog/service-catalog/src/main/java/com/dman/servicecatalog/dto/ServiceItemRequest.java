package com.dman.servicecatalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ServiceItemRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String nombre;

    private String descripcion;

    @Size(max = 50)
    private String categoria;

    @Size(max = 255)
    private String icono;

    private Boolean activo;
}

