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
