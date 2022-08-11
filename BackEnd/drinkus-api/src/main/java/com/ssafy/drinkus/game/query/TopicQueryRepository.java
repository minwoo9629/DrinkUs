package com.ssafy.drinkus.game.query;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.room.domain.Topic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

import static com.ssafy.drinkus.room.domain.QTopic.topic;

@Repository
@RequiredArgsConstructor
public class TopicQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Topic> findByCategoryId(Long categoryId){
        QueryResults<Topic> results = queryFactory
                .selectFrom(topic)
                .where(categoryIdEq(categoryId))
                .fetchResults();
        List<Topic> contents = results.getResults();
        System.out.println(Arrays.toString(contents.toArray()));
        return contents;
    }

    private BooleanExpression categoryIdEq(Long categoryId) {
        return (categoryId != null && categoryId > 0) ? topic.category.categoryId.eq(categoryId).or(topic.category.categoryId.isNull()) : null;
    }
}
