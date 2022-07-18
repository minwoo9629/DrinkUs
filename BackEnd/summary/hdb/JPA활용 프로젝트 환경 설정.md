## 프로젝트 생성

---

[Spring Initializr](https://start.spring.io)

- Project: Gradle Project 선택
- Spring Boot: 2.3.x 선택
- Language: Java 선택
- Packaging : Jar 선택
- Java version : 15
- groupId: jpabook
- artifactId: jpashop
- **Dependencies** : 스프링 Web, 타임리프, 스프링 데이터 JPA, H2, Lombok, validation

실행 → JPAShopApplication을 실행(whitelabel)

## 라이브러리 살펴보기

---

**gradle 의존 관계 보기**

```java
./gradlew dependencies --configuration compileClasspath
```

### 스프링 부트 라이브러리 살펴보기

- `spring-boot-starter-web`
    - `spring-boot-stater-tomcat` : 톰캣 ( 웹서버)
    - `spring-boot-webmvc` : 스프링 웹 MVC
- `spring-boot-starter-thymeleaf` : 타임리프 템플릿 엔진 (View)
- `spring-boot-starter-data-jpa`
    - `spring-boot-starter-aop`
    - `spring-boot-starter-jdbc`
        - `HikariCP` 커넥션 풀 (부트 2.0 기본)
    - `hibernate + JPA` : 하이버네이트 + JPA
    - `spring-data-jpa` : 스프링 데이터 JPA
- `spring-boot-starter`(공통) : 스프링 부트 + 스프링 코어 + 로깅
    - `spring-boot`
        - `spring-core`
    - `spring-boot-starter-logging`
        - `logback,slf4j`

### 테스트 라이브러리

- `spring-boot-starter-test`
    - `junit` : 테스트 프레임워크, 스프링부트 2.2 부터 `junit5`(`jupiter`) 사용
    - `mockito` : 목 라이브러리
    - `assertj`: 테스트 코드를 좀 더 편하게 작성하게 도와주는 라이브러리
    - `spring-test` : 스프링 통합 테스트 지원

### 라이브러리 정리

- 핵심 라이브러리
    - 스프링 MVC
    - 스프링 ORM
    - JPA, 하이버네이트
    - 스프링 데이터 JPA
- 기타 라이브러리
    - H2 데이터베이스
    - 커넥션 풀 : HikariCP
    - WEB (thymeleaf)
    - 로깅 SLF4J & LogBack
    - 테스트
    

## View 환경 설정

---

**thymeleaf 템플릿 엔진**

- thymeleaf 공식 사이트
    
    [Thymeleaf](https://www.thymeleaf.org)
    
- 스프링 부트 thymeleaf viewName 매핑
    - resources : `templates/ + {viewName} + .html`

**테스트 Controller**

```java
@Controller
public class HelloController {

    @GetMapping("hello")
    public String hello(Model model){
        model.addAttribute("data","hello!!!");
        return "hello";
    }
}
```

**thymeleaf 템플릿엔진 동작 확인 (`hello.html`)**

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p th:text="'안녕하세요. ' + ${data}" >안녕하세요. 손님</p>
</body>
</html>
```

- 위치 : `resources/templates/hello.html`

**정적 페이지 만들기(`static/index.html`)**

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
Hello
<a href="/hello">hello</a>
</body>
</html>
```

🤔 **참고** 

- `spring-boot-devtools` 라이브러리를 추가하면 html 파일을 컴파일만 해주면 서버 재시작 없이 View파일 변경이 가능
    
    ```java
    // build.gradle 추가
    implementation 'org.springframework.boot:spring-boot-devtools'
    ```
    
- 인텔리제이 컴파일 방법 : 메뉴 build → Recompile

## H2 데이터베이스 설치

---

- **개발이나 테스트 용도로 가볍고 편리한 DB, 웹 화면 제공**
- 권한 주기 : `chmod 755 h2.sh`
- 데이터베이스 파일 생성 방법
    1. `jdbc:h2:~/jpashop` (최초 한번)
    2. `~/jpashop.mv.db` ← 파일 생성 확인
    3. 이후부터 `jdbc:h2:tcp://localhost/~/jpashop` 으로 접속

## JPA와 DB 설정, 동작확인

---

**application.yml**

```yaml
spring:
  datasource:
    url: jdbc:h2:tcp://localhost/~/jpashop
    username: sa
    password:
    driver-class-name: org.h2.Driver

  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
#        show_sql: true
        format_sql: true

logging.level:
  org.hibernate.SQL: debug
#  org.hibernate.type: trace
```

- `show_sql` : 콘솔에 하이버네이트 실행 SQL을 남긴다.
- `org.hibernate.SQL` : 옵션은 logger를 통해 하이버네이트 실행 SQL을 남긴다.

**쿼리 파라미터 로그 남기기**

- 로그에 다음을 추가하기 → `org.hibernate.type: trace`
- 외부 라이브러리 사용
    
    ```java
    // build.gradle 에 추가
    implementation 'com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.5.7'
    ```
    
    - 외부 라이브러리는 시스템 자원을 사용하므로 성능 하락이 생길 수도 있다.
    - 개발 단계에서는 편하게 사용해도 되지만 운영 시스템에 적용할 때는 성능 테스트를 하고 사용하는 것이 좋다.
    

**스프링 부트를 통해 복잡한 설정이 자동화**

- `persistence.xml` → X
- `EntityManagerFactoryBean` →  X
