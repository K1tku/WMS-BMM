FROM openjdk:17
ARG JAR_FILE=backend/app/backend.jar
COPY ${JAR_FILE} backend.jar
ENTRYPOINT ["java","-jar","/backend.jar"]


