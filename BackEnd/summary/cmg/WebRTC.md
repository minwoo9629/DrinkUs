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

## ICE Candidate (Interactive Connectivitiy Establishment)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1d91d13c-3ae3-4cb0-b1e1-3b2fa9dabccd/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/169576b3-deab-4327-9737-cc415f210c00/Untitled.png)

- r각 피어들은 candidate들을 전송하고, 준비가 되면 받은 candidate 들을 처리함
- candidate들은 양 피어들이 동의할 때까지 계속 교환되며, 미디어가 송수신 되도록 만든다.
- 올바르게 작동할 경우, 각 피어들은 모두 소진되거나 서로 동읳라 때까지 상대방에게 제안할 candidate들을 계속 전송한다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a84b49a6-e4b1-4343-9474-c15327ac1472/Untitled.png)

## STUN 방식

- 단말이 자신의 공인 IP주소, 포트를 확인하는 과정에 대한 프로토콜
- 인터넷의 복잡한 주소들 속에서 유일하게 자기 자신을 식별할 수 있는 정보를 반환해 줌
- **WebRTC에서의 STUN**
  1. WebRTC 연결을 시작하기 전에 `STUN 서버`를 향해 요청을 보냄
  2. `STUN 서버`는 NAT 뒤에 있는 피어들이 서로 연결할 수 있도록 `공인IP`와 `포트`를 찾아줌
  3. 이로써 2개의 장치가 `P2P연결` 을 시도할 수 있는 고유한 주소를 알아내게 됨

---

## TURN 방식

- STUN 서버 만으로 항상 자신의 정보를 알아내긴 어려움 ⇒ 대응책이 TURN 서버
- TURN 방식 : 네트워크 미디어를 중개하는 서버를 이용
- **단점**
  - 중간에 서버를 한 번 거치기 때문에 P2P통신이 아니게 되며, 지연이 필연적으로 발생
- **장점**
  - 보안 정책이 엄격한 `개인 NAT 내부에 위치한 브라우저`와 P2P 통신을 할 수 있는 유일한 방법, 최후의 수단

---

## 화상통화와 화상회의의 차이점

- **1:1 영상통화를 하는 경우**
  - 두 브라우저 간 패킷들은 확실하게 암호화가 되어 전달됨
  - `브라우저 간 P2P 연결`

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6bdd898-7c22-476b-93d2-784b14c35c3a/Untitled.png)

- **화상회의 같은 다수의 사람들이 동시에 영상을 주고받는 경우**
  - 클라이언트 한계, `미디어 서버`의 도움을 받게 됨
  - `브라우저가 서버와 P2P 연결`

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/34daa1e2-52a8-4503-8db0-a42703b20dab/Untitled.png)

---

## MCU (Multipoint Control Unit) 미디어 서버

- 브라우저→서버 간에는 `암호화(Secure RTP Stream)` 이 되므로 문제가 없음
- 서버가 영상을 받고 나면 `복호화(RTP Stream)` 이 되므로 영상의 내용을 볼 수 있음
  - **장점** : 각각 받은 사용자들의 영상 다양한 활용 가능 (녹화, 필터 등…)
  - **단점** : 해킹 가능성

---

## SFU (Selective Forwarding Unit) 미디어 서버

- 가장 기본적인 사용환경에서 단지 패킷을 받아서 복제해 나눠주기만 함
- 패킷에 어떤 내용이 있는지 신경쓰지 않음 ⇒ **보안 강화**
- 그러나 여전히 서버는 브라우저가 보낸 프레임 데이터를 열어볼 수 있음
  - 클라이언트가 패킷을 조작하는 API가 없기 때문

---

## E2EE (End-To-End Encryption) 영상 전송

- 종단 간 암호화
  - 보내는 쪽 : WebRTC를 통해 프레임을 보내기 전에 특정 키로 암호화
  - 받는 쪽 : WebRTC를 통해 받은 프레임을 특정 키로 복호화 후 플레이

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5eb0e94-809c-4694-b46d-664a4e253b21/Untitled.png)

---

## Kurento 미디어 서버 ← For SSAFY

- WebRTC 미디어 서버와 클라이언트 API 등의 WebRTC 전체 사양이 구현된 패키지