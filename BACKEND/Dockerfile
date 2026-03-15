# --------- STAGE 1: Build da aplicação ---------
FROM maven:3.9.9-eclipse-temurin-21 AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas o pom primeiro (melhor cache)
COPY pom.xml .

# Baixa dependências
RUN mvn -B -q -e -DskipTests dependency:go-offline

# Copia o resto do projeto
COPY src ./src

# Compila o projeto
RUN mvn clean package -DskipTests


# --------- STAGE 2: Runtime ---------
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copia o .jar gerado no stage anterior
COPY --from=builder /app/target/*.jar app.jar

# Porta padrão do Spring
EXPOSE 8080

# Rodar a aplicação
ENTRYPOINT ["java","-jar","app.jar"]