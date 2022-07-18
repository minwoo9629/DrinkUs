# JPA
## ORM

- Application Class와 Relational Database의 테이블을 매핑(연결)한다는 뜻

## ORM의 장점

- SQL이 아닌 메소드로 DB 조작 가능
    - 객체 모델을 이용하여 비즈니스 로직 구성에만 집중
- 쿼리를 작성하지 않아도 되므로 부수적인 코드 ↓, 코드 가독성 ↑
- 객체지향적으로 코드 작성 가능
- ERD 의존도 감소, 유지보수 및 리팩토링 유리
    - SQL 변경에 따른 쿼리 재구성 할 필요 없음

## ORM의 단점

- 프로젝트의 규모가 크고 복잡하여 설계가 잘못된 경우, 속도 저하 및 일관성이 무너짐

## JPA란

- Java Persistence API
- 자바 진영에서 ORM(Object-Relational Mapping) 기술 표준으로 사용되는 인터페이스의 모음
- 프레임워크

## Service의 역할

- 비즈니스 로직을 처리하지 않는다
- 트랜잭션, 도메인 간 순서 보장의 역할만 한다
- 삽입, 수정, 삭제의 Transactional 어노테이션을 적용해야 할 영역이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/244f87cc-b86a-4a71-aff2-7158bbbc7088/Untitled.png)

## Entity

- `DB Layer`
- JPA가 관리하는 클래스
- 데이터베이스와 맞닿은 핵심 클래스
- Entity 클래스를 기준으로 테이블이 생성되고, 스키마가 변경된다.
- 절대 Request/Response 클래스로 사용하지 말 것!!
- Dto를 비롯한 여러 클래스에 영향을 끼치기 때문에 되도록 변경이 없어야 한다.

## Dto

- `View Layer`
- Entity 클래스를 유사한 형태로 재작성한 클래스
- Request/Response 객체를 위해 사용되는 클래스
- Request와 Response를 위한 Dto는 View를 위한 클래스이기 때문에, 자주 변경이 필요하다.

## JPA Auditing

- 데이터의 생성 및 수정시간 등록에 사용
- 단순하고 반복적인 날짜 데이터 등록/수정 코드가 발생하는 문제를 해결하기 위해 등장