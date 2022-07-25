# Eschool


Minimal [Spring Boot](http://projects.spring.io/spring-boot/) sample app.

## Requirements

For building and running the application you need:

- [JDK 15](http://www.oracle.com/technetwork/java/javase/downloads/jdk15-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally

 Чтобы скачать с гитхаба проект запускаем команду:
```
$ git clone https://github.com/Daryn0001/Eschool
```
 
 

Заходим в папку:
eschool/client

запускаем команду:
```
npm install
```
Потом заходим в папку:

через команду 
```
cd .. 
```
обратно выйдем на папку "eschool" 

```
 запускаем команду:
 ```
mvn spring-boot:run
```

Ждём, когда запуститься сервер. После запуска сервера, заходим в браузере по адресу:
http://locahost:3000/auth/register 

проходим регистрацию потом откроем окна логин и введем email и password 
После этого откроется доступ к окнам "StudentList" и "Add Student"
