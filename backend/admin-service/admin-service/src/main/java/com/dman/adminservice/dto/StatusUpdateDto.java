package com.dman.adminservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class StatusUpdateDto {

    @NotBlank
    @Pattern(regexp = "PENDIENTE|ATENDIDO", message = "Estado debe ser PENDIENTE o ATENDIDO")
    private String estado;
}

