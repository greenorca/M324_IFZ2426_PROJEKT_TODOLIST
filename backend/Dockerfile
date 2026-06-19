FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean test
RUN mvn package -Dmaven.test.skip

FROM eclipse-temurin:21-jre AS runtime

COPY --from=builder app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

