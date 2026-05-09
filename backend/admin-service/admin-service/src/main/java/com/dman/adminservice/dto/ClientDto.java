package com.dman.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDto {
    private Long id;
    private String nombre;
    private String telefono;
    private String email;
    private String servicio;
    private String mensaje;
    private LocalDateTime fechaRegistro;
}

