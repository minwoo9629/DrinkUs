FROM openjdk:17-ea-11-jdk-slim

VOLUME /tmp
COPY build/libs/drinkus-api-0.0.1-SNAPSHOT.jar drinkus-api.jar

ENTRYPOINT ["java","-jar","drinkus-api.jar"]