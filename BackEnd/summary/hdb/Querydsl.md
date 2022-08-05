
## 스프링 데이터 JPA 리포지토리로 변경

---

**스프링 데이터 JPA** 

```java
public interface MemberRepository extends JpaRepository<Member,Long>,MemberRepositoryCustom {

    // select m from Member m where m.username = ?
    List<Member> findByUsername(String username);
}
```

- Querydsl 전용 기능 작성 X → 사용자 정의 리포지토리 필요

**스프링 데이터 JPA 테스트**

```java
@SpringBootTest
@Transactional
public class MemberRepositoryTest {

    @Autowired
    EntityManager em;

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void basicTest(){
        Member member = new Member("member1",10);
        memberRepository.save(member);

        Member findMember = memberRepository.findById(member.getId()).get();
        assertThat(findMember).isEqualTo(member);

        List<Member> result1 = memberRepository.findAll();
        assertThat(result1).containsExactly(member);

        List<Member> result2 = memberRepository.findByUsername("member1");
        assertThat(result2).containsExactly(member);
    }
}
```

## 사용자 정의 리포지토리

---

**사용자 정의 리포지토리 사용법**

1. 사용자 정의 인터페이스 작성
2. 사용자 정의 인터페이스 구현
3. 스프링 데이터 리포지토리에 사용자 정의 인터페이스 상속

**사용자 정의 리포지토리 구성**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/38a58411-a821-4006-a1eb-33dbf4609c65/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/38a58411-a821-4006-a1eb-33dbf4609c65/Untitled.png)

1. **사용자 정의 인터페이스 작성**

```java
public interface MemberRepositoryCustom {

    List<MemberTeamDto> search(MemberSearchCondition condition);
}
```

2.  **사용자 정의 인터페이스 구현**

```java
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<MemberTeamDto> search(MemberSearchCondition condition) {
        return queryFactory
                .select(new QMemberTeamDto(
                        member.id.as("memberId"),
                        member.username,
                        member.age,
                        team.id.as("teamId"),
                        team.name.as("teamName")))
                .from(member)
                .leftJoin(member.team, team)
                .where(
                        usernameEq(condition.getUsername()),
                        teamNameEq(condition.getTeamName()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                )
                .fetch();
    }

    private BooleanExpression usernameEq(String username) {
        return StringUtils.hasText(username) ? member.username.eq(username) : null;
    }

    private BooleanExpression teamNameEq(String teamName) {
        return StringUtils.hasText(teamName) ? team.name.eq(teamName) : null;
    }

    private BooleanExpression ageGoe(Integer ageGoe) {
        return ageGoe != null ? member.age.goe(ageGoe) : null;
    }

    private BooleanExpression ageLoe(Integer ageLoe) {
        return ageLoe != null ? member.age.loe(ageLoe) : null;
    }
}
```

**3. 스프링 데이터 리포지토리에서 사용자 정의 인터페이스 상속**

```java
public interface MemberRepository extends JpaRepository<Member,Long>,MemberRepositoryCustom {

    // select m from Member m where m.username = ?
    List<Member> findByUsername(String username);
}
```

**커스텀 리포지토리 동작 테스트** 

```java
		@Test
    public void searchTest(){
        Team teamA = new Team("teamA");
        Team teamB = new Team("teamB");
        em.persist(teamA);
        em.persist(teamB);

        Member member1 = new Member("member1", 10, teamA);
        Member member2 = new Member("member2", 20, teamA);
        Member member3 = new Member("member3", 30, teamB);
        Member member4 = new Member("member4", 40, teamB);
        em.persist(member1);
        em.persist(member2);
        em.persist(member3);
        em.persist(member4);

        MemberSearchCondition condition = new MemberSearchCondition();
        condition.setAgeGoe(35);
        condition.setAgeLoe(40);
        condition.setTeamName("teamB");
        // 만약 조건이 다 빠지면 모든 데이터를 가져올 수도 있으므로 수백만건있는 데이터를 가져오면 큰일난다...

        List<MemberTeamDto> result = memberRepository.search(condition);

        assertThat(result).extracting("username").containsExactly("member4");
    }
```

## 스프링 데이터 페이징 활용 1 - Querydsl 페이징 연동

---

- 스프링 데이터 `Page`, `Pageable` 활용
- 전체 카운트를 한번에 조회하는 단순한 방법
- 데이터 내용과 전체 카운트를 별도로 조회하는 방법

**사용자 정의 인터페이스 페이징 2가지 추가**

```java
public interface MemberRepositoryCustom {

    List<MemberTeamDto> search(MemberSearchCondition condition);
    Page<MemberTeamDto> searchPageSimple(MemberSearchCondition condition, Pageable pageable);
    Page<MemberTeamDto> searchPageComplex(MemberSearchCondition condition, Pageable pageable);
}
```

**전체 카운트를 한번에 조회하는 단순한 방법**

```java
		@Override
    public Page<MemberTeamDto> searchPageSimple(MemberSearchCondition condition, Pageable pageable) {
        QueryResults<MemberTeamDto> results = queryFactory
                .select(new QMemberTeamDto(
                        member.id.as("memberId"),
                        member.username,
                        member.age,
                        team.id.as("teamId"),
                        team.name.as("teamName")))
                .from(member)
                .leftJoin(member.team, team)
                .where(
                        usernameEq(condition.getUsername()),
                        teamNameEq(condition.getTeamName()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<MemberTeamDto> content = results.getResults();
        long total = results.getTotal();
        return new PageImpl<>(content, pageable, total);
    }
```

- `fetchResults()` 사용
- `fetchResults()`를 사용하면 내용과 전체 카운트를 한번에 조회 가능 (실제 쿼리는 2번 호출)
- `fetchResults()`는 카운트 쿼리 실행시 필요없는 `order by`는 삭제

**데이터 내용과 전체 카운트를 별도로 조회하는 방법**

```java
		@Override
    public Page<MemberTeamDto> searchPageComplex(MemberSearchCondition condition, Pageable pageable) {
        List<MemberTeamDto> content = queryFactory
                .select(new QMemberTeamDto(
                        member.id.as("memberId"),
                        member.username,
                        member.age,
                        team.id.as("teamId"),
                        team.name.as("teamName")))
                .from(member)
                .leftJoin(member.team, team)
                .where(
                        usernameEq(condition.getUsername()),
                        teamNameEq(condition.getTeamName()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 카운트 쿼리 따로 생성
        long total = queryFactory
                .select(member)
                .from(member)
                .leftJoin(member.team, team)
                .where(
                        usernameEq(condition.getUsername()),
                        teamNameEq(condition.getTeamName()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                );
                .fetchCount();

        return new PageImpl<>(content,pageable,total);
    }
```

- 전체 카운트를 조회하는 방법을 최적화할 수 있을 때 분리

## 스프링 데이터 페이징 활용 2 - countQuery 최적화

---

**PageableExecutionUtils.getPage()로 최적화**

```java
				// 카운트 쿼리 따로 생성
        JPAQuery<Member> countQuery = queryFactory
                .select(member)
                .from(member)
                .leftJoin(member.team, team)
                .where(
                        usernameEq(condition.getUsername()),
                        teamNameEq(condition.getTeamName()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                );
//                .fetchCount();

//        return new PageImpl<>(content,pageable,total);

        // 첫번째 페이지 사이즈가 데이터 사이즈보다 크고, 마지막 페이지도!
        return PageableExecutionUtils.getPage(content,pageable,()-> countQuery.fetchCount());
```

- 스프링 데이터 라이브러리가 제공
- `count` 쿼리가 생략 가능한 경우 생략해서 처리
    - 페이지가 시작이면서 컨텐츠 사이즈가 페이지 사이즈보다 작을 때
    - 마지막 페이지 일 때 (`offset` + `컨텐츠 사이즈`를 더해서 전체 사이즈 구하기)

## 스프링 데이터 페이징 활용3 - 컨트롤러 개발

---

**회원 컨트롤러** 

```java
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberJpaRepository memberJpaRepository;
    private final MemberRepository memberRepository;

    @GetMapping("/v1/members")
    public List<MemberTeamDto> searchMemberV1(MemberSearchCondition condition) {
        return memberJpaRepository.search(condition);
    }

    @GetMapping("/v2/members")
    public Page<MemberTeamDto> searchMemberV2(MemberSearchCondition condition, Pageable pageable) {
        return memberRepository.searchPageSimple(condition,pageable);
    }

    @GetMapping("/v3/members")
    public Page<MemberTeamDto> searchMemberV3(MemberSearchCondition condition, Pageable pageable) {
        return memberRepository.searchPageComplex(condition,pageable);
    }

}
```

- `http://localhost:8080/v2/members?size=5&&page=2` 테스트
