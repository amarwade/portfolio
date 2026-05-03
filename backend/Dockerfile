# =========================
# Stage 1: build Java app
# =========================
# We use a Maven image with JDK 17 to compile/package the Spring Boot backend.
FROM maven:3.9.9-eclipse-temurin-17 AS builder

# Working directory inside the build container.
WORKDIR /app

# Copy backend source code into the container.
COPY . .

# Build the jar without running tests to speed up image build.
# (CI should keep running tests separately.)
RUN mvn -B -DskipTests clean package

# =========================
# Stage 2: runtime image
# =========================
# We use a lightweight JRE image for runtime.
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy only the generated jar from the builder stage.
COPY --from=builder /app/target/*.jar app.jar

# Spring Boot backend port.
EXPOSE 8081

# Start the backend.
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
