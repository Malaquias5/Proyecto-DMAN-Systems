package com.dman.contactservice.repository;

import com.dman.contactservice.entity.ContactMessage;
import com.dman.contactservice.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByFechaEnvioDesc();
    List<ContactMessage> findByEstadoOrderByFechaEnvioDesc(MessageStatus estado);
    long countByEstado(MessageStatus estado);
}

