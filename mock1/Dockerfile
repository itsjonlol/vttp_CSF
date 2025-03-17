#THIS IS JUST AN EXAMPLE IF I NEED TO COPY A FILE FROM DATA/PRODUCTS.CSV!!!!!


# build angular app
FROM node:23 AS ngbuild

WORKDIR /client

# install angular cli
RUN npm i -g @angular/cli

COPY ecommerce/client/angular.json .
COPY ecommerce/client/package.json .
COPY ecommerce/client/tsconfig.json .
COPY ecommerce/client/tsconfig.app.json .

#COPY client/server.ts .
#COPY client/ngsw-config.json .
COPY ecommerce/client/src src

RUN npm i
RUN npm ci
RUN ng build

#/client/dist/client-side/browser/ will be created ( depends on angular.json)

# Stage 2 - build spring boot
FROM openjdk:23 AS javabuild

WORKDIR /server

COPY ecommerce/pom.xml .
COPY ecommerce/.mvn .mvn
COPY ecommerce/mvnw .
COPY ecommerce/src src

COPY --from=ngbuild /client/dist/client-side/browser src/main/resources/static

RUN chmod a+x mvnw
RUN ./mvnw package -Dmaven.test.skip=true
#creates /server/target/ecommerce-0.0.1-SNAPSHOT.jar

## RUN container
FROM openjdk:23

WORKDIR /app

COPY --from=javabuild /server/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar
COPY data/products.csv data/


ENV PORT=8080

EXPOSE ${PORT}

# start container
ENTRYPOINT [ "java", "-jar", "app.jar"]

#docker build -t itsjonlol/ecommerce:0.0.1 . 