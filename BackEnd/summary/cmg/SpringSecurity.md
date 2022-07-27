## 인증과 인가

- 인증 (Authenticate)
    - 누구인가? (세션을 검사해 신원 확인 및 권한 부여)
- 인가 (Authorize)
    - 무엇을 할 수 있는가? (권한을 검사)

## 기본 용어

- **Principal (접근 주체)**
    - 보호된 리소스에 접근하는 대상
- **인증 (Authentication)**
    - 보호된 리소스에 접근한 대상에 대해 누구인지, 애플리케이션의 작업을 수행해도 되는 주체인지 확인하는 과정
    - (ex) Form 기반 로그인, Oauth 2.0 기반 로그인
    - “누구인지” 확인하는 과정
- **인가 (Authorize)**
    - 해당 리소스에 대한 접근 가능한 권한을 가지고 있는지 확인하는 과정
    - `인증` 이 이뤄진 후에 확인한다
    - “뭘 할 수 있는지” 확인하는 과정
- **권한**
    - 어떠한 리소스에 대한 접근 제한

## 스프링 시큐리티 특징과 구조

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe94c019-3feb-4ff7-99b3-30cd3486ae94/Untitled.png)

- 스프링 시큐리티는 `세션 & 쿠키` 방식으로 인증한다.
- filter 기반으로 동작하여 MVC와 분리하여 관리 및 동작한다.
- 인증관리자와 접근결정 관리자를 통해서 사용자으 리소스 접근을 관리한다.
    - 인증 관리자 : `UsernamePasswordAuthenticationFilter`
    - 접근결정 관리자 : `FilterSecurityInterceptor`

## 스프링 시큐리티 작동 구조

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c5bd18f6-13b2-49fe-9510-b72c589555cd/Untitled.png)

- 스프링은 `DispatcherServlet` 앞단에 `Filter`를 배치시켜서 요청을 가로챈다.
- 클라이언트에 접근 권한이 없다면 인증 화면으로 `자동 리다이렉트` 시킨다.

## 스프링 시큐리티 필터

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/996fcfb8-701e-484d-abf7-28aff976c056/Untitled.png)

- 스프링 시큐리티 필터의 종류와 순서 (공식문서)
    - [https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-security-filters](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-security-filters)
- `UsernamePasswordAuthenticationFilter`
    - 클라이언트가 리소스를 요청할 때 접근 권한이 없는 경우 로그인 폼으로 보내게 됨
    - 그 역할을 하는 필터
    - RestAPI 구조에서는 로그인 폼이 따로 존재하지 않으므로 인증권한이 없다는 오류를 JSON 형태로 반환해줘야 한다. 이 필터 전에 해당 처리를 해줘야 한다. ⇒ `JWT` 활용


## JWT (Json Web Token) 을 통한 API 인증 및 권한 부여

- `인증`을 위한 로그인, 회원가입 API를 구현한다.
- 가입시 제한된 리소스에만 접근 가능하도록 `ROLE_USER` 권한을 회원에게 부여한다.
- 스프링 시큐리티에서 접근 제한이 필요한 리소스에 대해서 `ROLE_USER` 권한을 가져야 접근이 가능하도록 한다.
- 권한을 가진 회원이 로그인 성공 시 ⇒ 리소스에 접근할 수 있는 `JWT 토큰` 발급
- 회원은 발급받은 토큰으로 필요한 API 리소스 요청 및 사용

## JWT

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f309eb4e-bf43-4f55-8b96-ec53187ec177/Untitled.png)

- 전자 서명 된 URL-safe (URL로 이용할 수 있는 문자로만 구성된)의 JSON