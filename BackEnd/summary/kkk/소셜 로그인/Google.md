## 1. 구글 console API 사이트에서 프로젝트 생성하고 OAuth 클라이언트 ID 생성
![image](https://user-images.githubusercontent.com/84266499/179933987-f81c6ae2-54d4-4b19-8c04-570b78151871.png)


1. 프론트에서 구글 로그인 요청을 보낸다
2. 구글 로그인이 완료되면 인증이 완료되었다는 코드를 “승인된 리디렉션 URI”로 보내준다.
3. 받은 인증완료 코드를 바탕으로 구글에 액세스 토큰 요청 
4. 액세스 토큰을 가지고 구글 서버에 접속하여 사용자 정보들을 가져옴


승인된 리디렉션 URI는 저 주소로 고정해야 함 = 컨트롤러 만들 필요 없음(oauth2 라이브러리가 처리해주기 때문에)

````text
클라이언트 ID: 544385537574-774c31vj941hkdl0fp70vt0skjc3je3n.apps.googleusercontent.com
클라이언트 보안 비밀번호 : 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
````

## 2. 구글 로그인 이후
이런 창이 뜰 것임      
![image](https://user-images.githubusercontent.com/84266499/180090777-e1ace77d-f9a5-4c89-8323-7ce04f46261e.png)       
여기서 계정을 누르면 로그인이 완료되는데 다음과 같은 과정을 거치게 된다. (아직 구현 안되었기때문에 넘어가진 않음)
1. OAuth2 라이브러리를 사용하면 액세스 토큰 + 사용자 프로필 정보를 받음
2. 사용자 정보를 토대로 회원가입을 자동으로 진행 (이메일, 이름, 생년월일 가져와야 함)

## 3. 로그인 이후의 후처리
`SecurityConfig`에서 후처리를 위한 `OAuth2Service`를 연결해줄 수 있다.
````java
// 여기부터 소셜로그인용 security 설정.
.oauth2Login()
// .loginPage()  만약에 위에서 로그인 했을때 필터링해줄게 있다면 여기에서도 설정해주자
.userInfoEndpoint()
.userService(PrincipalDetailsService); // 소셜 로그인 완료된 이후의 후처리 (OAuth2UserService 타입)
````
후처리를 위한 메서드는 `DefaultOAuth2UserService`를 상속받은 서비스 클래스의 `loadUser()` 메서드에서 해줄 수 있다.     
````java
    // 구글 로그인 이후 받은 userRequest 데이터의 후처리를 위한 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest.getClientRegistration() = " + userRequest.getClientRegistration());
        System.out.println("userRequest.getAccessToken() = " + userRequest.getAccessToken());
        System.out.println("super.loadUser(userRequest).getAttributes() = " + super.loadUser(userRequest).getAttributes());

        return super.loadUser(userRequest);
    }
````
출력결과        
````text
userRequest.getClientRegistration() = ClientRegistration{registrationId='google', clientId='클라이언트 ID', clientSecret='클라이언트 Secret', clientAuthenticationMethod=org.springframework.security.oauth2.core.ClientAuthenticationMethod@4fcef9d3, authorizationGrantType=org.springframework.security.oauth2.core.AuthorizationGrantType@5da5e9f3, redirectUri='{baseUrl}/{action}/oauth2/code/{registrationId}', scopes=[email, profile], providerDetails=org.springframework.security.oauth2.client.registration.ClientRegistration$ProviderDetails@2f36e181, clientName='Google'}
userRequest.getAccessToken() = org.springframework.security.oauth2.core.OAuth2AccessToken@11f71234
super.loadUser(userRequest).getAttributes() = {sub=구글아이디의넘버, name=풀네임, given_name=이름, family_name=성, picture=프로필사진주소, email=이메일주소, email_verified=true, locale=ko}
````        
`GetAttributes()`로 얻어낸 `sub`가 해당 플랫폼의 유저 고유 키가 된다.     
즉, 우리 DB에는 `google_sub` 형태로 ID를 넣어주면 고유 키가 될 수 있음      
패스워드는 널만 아니면 아무거나 암호화해서 넣으면 됨     

- 회원 이메일: getAttribute의 이메일
- 회원 비밀번호: 아무거나 암호화한 비밀번호
- 회원 이름: 가져온 이름
- 회원 닉네임: 랜덤 생성된 닉네임
- 인기도: 0
- 인기도 횟수 제한: 5
- 생년월일: 받아올 수 있으면 받아서 넣고 없으면 비워둠
- 자기소개: null
- 프로필 이미지: null
- 가입일: 현재 날짜
- 탈퇴일: null
- 탈퇴 여부: N
- 회원 역할: ROLE_USER
- 회원 프로바이더: getClientRegistration의 registrationId
- 회원 프로바이더 ID: 회원프로바이더 + getAttributes의 sub 
- 회원 포인트: 0
- 정지기한: null
- 소주: 0
- 맥주: 0


