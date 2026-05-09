package com.dman.servicecatalog.config;

import com.dman.servicecatalog.entity.ServiceItem;
import com.dman.servicecatalog.repository.ServiceItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ServiceItemRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.save(ServiceItem.builder()
                    .nombre("Páginas Web")
                    .descripcion("Diseño y desarrollo de sitios web modernos, responsivos y optimizados para SEO.")
                    .categoria("web")
                    .icono("globe")
                    .activo(true)
                    .build());

            repository.save(ServiceItem.builder()
                    .nombre("Aplicaciones Móviles")
                    .descripcion("Desarrollo de aplicaciones móviles nativas y multiplataforma.")
                    .categoria("app")
                    .icono("smartphone")
                    .activo(true)
                    .build());

            repository.save(ServiceItem.builder()
                    .nombre("Sistemas de Ventas")
                    .descripcion("Sistemas POS personalizados con control de inventario, ventas y reportes.")
                    .categoria("ventas")
                    .icono("shopping-cart")
                    .activo(true)
                    .build());

            repository.save(ServiceItem.builder()
                    .nombre("Bots Automatizados")
                    .descripcion("Bots de WhatsApp, Telegram y chatbots para atención al cliente 24/7.")
                    .categoria("bot")
                    .icono("bot")
                    .activo(true)
                    .build());

            System.out.println("✅ Datos iniciales del catálogo de servicios cargados.");
        }
    }
}

