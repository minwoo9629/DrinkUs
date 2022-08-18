package com.ssafy.drinkus.dailyboard.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDailyBoard is a Querydsl query type for DailyBoard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDailyBoard extends EntityPathBase<DailyBoard> {

    private static final long serialVersionUID = 989422581L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDailyBoard dailyBoard = new QDailyBoard("dailyBoard");

    public final com.ssafy.drinkus.common.QBaseEntity _super = new com.ssafy.drinkus.common.QBaseEntity(this);

    public final StringPath boardContent = createString("boardContent");

    public final NumberPath<Long> boardId = createNumber("boardId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.drinkus.user.domain.QUser creater;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.ssafy.drinkus.user.domain.QUser modifier;

    public final NumberPath<Long> parentId = createNumber("parentId", Long.class);

    public QDailyBoard(String variable) {
        this(DailyBoard.class, forVariable(variable), INITS);
    }

    public QDailyBoard(Path<? extends DailyBoard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDailyBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDailyBoard(PathMetadata metadata, PathInits inits) {
        this(DailyBoard.class, metadata, inits);
    }

    public QDailyBoard(Class<? extends DailyBoard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.creater = inits.isInitialized("creater") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("creater")) : null;
        this.modifier = inits.isInitialized("modifier") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("modifier")) : null;
    }

}

