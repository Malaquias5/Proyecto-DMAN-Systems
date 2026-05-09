package com.dman.servicecatalog.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 50)
    private String categoria;  // "web", "app", "ventas", "bot"

    @Column(length = 255)
    private String icono;  // URL o nombre del ícono

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;
}

