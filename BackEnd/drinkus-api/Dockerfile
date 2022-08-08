FROM openjdk:8-jdk-alpine

VOLUME /tmp
COPY build/libs/drinkus-api-0.0.1-SNAPSHOT.jar drinkus-api.jar

ENTRYPOINT ["java","-jar","drinkus-api.jar"]
