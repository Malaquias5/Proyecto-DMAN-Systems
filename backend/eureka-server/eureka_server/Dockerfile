# ============================================
# STAGE 1: Build con Maven
# ============================================
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /build

# Cache de dependencias (lo más pesado)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar código y compilar
COPY src ./src
RUN mvn clean package -DskipTests -B

# ============================================
# STAGE 2: Imagen liviana de runtime
# ============================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Crear usuario no-root (mejor seguridad)
RUN addgroup -S spring && adduser -S spring -G spring

# Copiar JAR del stage anterior
COPY --from=builder /build/target/*.jar app.jar

# Cambiar dueño y usuario
RUN chown spring:spring app.jar
USER spring

EXPOSE 8761

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8761/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]