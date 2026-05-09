package com.dman.contactservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactMessageRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String nombre;

    @Email(message = "Formato de email inválido")
    @Size(max = 100)
    private String email;

    @Size(max = 20)
    private String telefono;

    @Size(max = 150)
    private String asunto;

    @NotBlank(message = "El mensaje es obligatorio")
    private String mensaje;
}

