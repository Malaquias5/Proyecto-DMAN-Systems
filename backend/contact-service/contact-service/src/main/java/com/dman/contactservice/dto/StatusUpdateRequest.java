package com.dman.contactservice.dto;

import com.dman.contactservice.enums.MessageStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusUpdateRequest {

    @NotNull(message = "El estado es obligatorio")
    private MessageStatus estado;
}

