package com.ssafy.drinkus.interest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterest is a Querydsl query type for Interest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterest extends EntityPathBase<Interest> {

    private static final long serialVersionUID = 1138597199L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterest interest = new QInterest("interest");

    public final QCategory category;

    public final NumberPath<Long> interestId = createNumber("interestId", Long.class);

    public final StringPath interestName = createString("interestName");

    public final ListPath<com.ssafy.drinkus.user.domain.UserInterest, com.ssafy.drinkus.user.domain.QUserInterest> userInterestList = this.<com.ssafy.drinkus.user.domain.UserInterest, com.ssafy.drinkus.user.domain.QUserInterest>createList("userInterestList", com.ssafy.drinkus.user.domain.UserInterest.class, com.ssafy.drinkus.user.domain.QUserInterest.class, PathInits.DIRECT2);

    public QInterest(String variable) {
        this(Interest.class, forVariable(variable), INITS);
    }

    public QInterest(Path<? extends Interest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterest(PathMetadata metadata, PathInits inits) {
        this(Interest.class, metadata, inits);
    }

    public QInterest(Class<? extends Interest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category")) : null;
    }

}

