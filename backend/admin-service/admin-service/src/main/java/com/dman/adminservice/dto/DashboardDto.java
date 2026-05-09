package com.dman.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    private long totalClientes;
    private long totalMensajes;
    private long mensajesPendientes;
    private long mensajesAtendidos;
}

