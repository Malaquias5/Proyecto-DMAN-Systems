package com.dman.contactservice.dto;

import com.dman.contactservice.enums.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageResponse {
    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String asunto;
    private String mensaje;
    private MessageStatus estado;
    private LocalDateTime fechaEnvio;
    private LocalDateTime fechaAtencion;
}

