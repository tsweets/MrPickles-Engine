# MrPickles-Engine
Backends for Frontends Framework using Spring Boot
![alt text](docs/images/bff-arch.excalidraw.png "BFF Architecture")

# Spring Notes:
There is bug in spring framework fixed by this
https://github.com/spring-projects/spring-framework/commit/a06bbccf9ecccd41f1099e0462005478cc84974b

Described here https://github.com/spring-projects/spring-security/issues/16002

Avoid Spring boot 3.3.5 and framework < 6.1.15 (most likely)
# Starting Up App
1. Start Keycloak  (if not using remote)
```
cd keycloak
docker compose up
```
2. Start Reverse Proxy
```
run app from intellij
TODO: mvn run
```

3. Start VUE UI Frontend
```
Optional: npm install
npm run dev
```
direct link http://localhost:4202/vue-ui
through app http://localhost:7080/vue-ui/

4. Start BFF
run app from intellij or from backend/bff
```
mvn spring-boot:run
```

5. Start Resource Server

## Keycloak
Admin Page
http://localhost:7080/auth
admin\admin

Normal App User:  
user\user

note: remote keycloak for dev is at http://keycloak.sde.skyline-lab.com:8443

# Docker Notes
## Docker Build

```
mvn compile jib:dockerBuild
```
or 
```
 mvn clean compile jib:dockerBuild 
```

## Docker Run
docker run -p 8888:8888
