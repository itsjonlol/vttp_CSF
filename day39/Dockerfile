# # build angular app
# FROM node:23 AS ngbuild

# WORKDIR /client

# # install angular cli
# RUN npm i -g @angular/cli@19.2.1

# COPY client/angular.json .
# COPY client/package.json .
# COPY client/tsconfig.json .
# COPY client/tsconfig.app.json .
# COPY client/.postcssrc.json .
# #COPY client/server.ts .
# #COPY client/ngsw-config.json .
# COPY client/src src



# RUN npm i
# RUN npm ci
# RUN ng build

#/client/dist/client/browser/ will be created

# Stage 2 - build spring boot
FROM openjdk:23 AS javabuild

WORKDIR /server

COPY day39/pom.xml .
COPY day39/.mvn .mvn
COPY day39/mvnw .
COPY day39/src src

# COPY --from=ngbuild /client/dist/client/browser src/main/resources/static

RUN chmod a+x mvnw
RUN ./mvnw package -Dmaven.test.skip=true
#creates /server/target/day39-0.0.1-SNAPSHOT.jar

## RUN container
FROM openjdk:23

WORKDIR /app

COPY --from=javabuild /server/target/day39-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080

EXPOSE ${PORT}

# start container
ENTRYPOINT [ "java", "-jar", "app.jar"]