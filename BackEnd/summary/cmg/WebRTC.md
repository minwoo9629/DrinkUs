# WebRTC

## WebRTC란? (Web Real-Time Communication)

> 웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림 할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술
> 
- 서버와 같은 중간자를 거치지 않고 브라우저 간 P2P
- P2P의 장점
    1. 중개 서버를 거치지 않으므로 빠른 속도
    2. HTTPS가 강제되므로 보안성
    3. 실시간 상호작용 가능
- WebRTC 커넥션을 만들어야 하고, 이를 위한 시그널링 서버 구축이 되어야 한다.

---

## 시그널링

> RTCPeerConnection 통신에 사용할 프로토콜, 채널, 미디어 코덱 및 형식, 데이터 전송 방법, 라우팅 정보와 NAT 통과 방법을 포함한 통신 규격을 교환하기 위해 두 장치의 제어 정보를 교환하는 과정까지
> 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6547df49-df8a-4db8-b6be-d9224105071b/Untitled.png)

---

## P2P 방식의 커뮤니케이션 과정

1. 각 브라우저가 P2P 커뮤니케이션에 동의
2. 서로의 주소를 공유
3. 보안 사항 및 방화벽 우회
4. 멀티미디어 데이터를 실시간으로 교환

⇒ 2, 3단계는 웹브라우저에서 해결이 어려움

⇒ 그러므로 통신 초기단계에는 중재자가 필요함 (`시그널링 서버`)

---

## SDP (Session Description Protocol)

> WebRTC에서 스트리밍 미디어의 해상도나 형식, 코덱 등의 멀티미디어 컨텐츠의 초기 인수를 설명하기 위해채택한 프로토콜
> 
- SDP로 보낼 수 있는 데이터 예시
    1. 웹캠 비디오의 해상도
    2. 오디오 전송 또는 수신 여부
    3. 기타 parameter들

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b60d9ee4-32a7-4072-81fc-f02b59501184/Untitled.png)

1. A가 SDP 형태의 Offer 메시지를 생성한다.
2. A가 생성된 Offer 메시지를 본인의 `LocalDescription`으로 등록한다.
3. A가 Offer 메시지를 `시그널링 서버`에게 전달한다.
4. `시그널링 서버`는 B를 찾아서 SDP 정보를 전달한다.
5. B는 전달받은 Offer 메시지를 본인의 `RemoteDescription`에 등록한다.
6. B는 Answer 메시지를 생성한다.
7. 생성된 Answer 메시지를 본인의 `LocalDescription`으로 등록한다.
8. B는 Answer 메시지를 `시그널링 서버`에게 전달한다.
9. `시그널링 서버`는 A를 찾아서 Answer 메시지를 전달한다.
10. A는 전달받은 Answer 메시지를 본인의 `RemoteDescription`에 등록한다.

- 각자가 보낼 데이터의 파라미터들은 알게 되었지만, 미디어 데이터를 전송하는 방법은 아직 모른다. ⇒ `ICE`

---