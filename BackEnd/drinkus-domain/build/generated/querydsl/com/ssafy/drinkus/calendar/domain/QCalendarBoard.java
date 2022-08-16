package com.ssafy.drinkus.calendar.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCalendarBoard is a Querydsl query type for CalendarBoard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCalendarBoard extends EntityPathBase<CalendarBoard> {

    private static final long serialVersionUID = -1398328401L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCalendarBoard calendarBoard = new QCalendarBoard("calendarBoard");

    public final com.ssafy.drinkus.common.QBaseEntity _super = new com.ssafy.drinkus.common.QBaseEntity(this);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages20 = createEnum("ages20", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages30 = createEnum("ages30", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages40 = createEnum("ages40", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages50 = createEnum("ages50", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages60 = createEnum("ages60", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages70 = createEnum("ages70", com.ssafy.drinkus.common.type.YN.class);

    public final StringPath calendarContent = createString("calendarContent");

    public final DateTimePath<java.time.LocalDateTime> calendarDatetime = createDateTime("calendarDatetime", java.time.LocalDateTime.class);

    public final NumberPath<Long> calendarId = createNumber("calendarId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.drinkus.user.domain.QUser creater;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.ssafy.drinkus.user.domain.QUser modifier;

    public final NumberPath<Integer> peopleLimit = createNumber("peopleLimit", Integer.class);

    public final StringPath place = createString("place");

    public QCalendarBoard(String variable) {
        this(CalendarBoard.class, forVariable(variable), INITS);
    }

    public QCalendarBoard(Path<? extends CalendarBoard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCalendarBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCalendarBoard(PathMetadata metadata, PathInits inits) {
        this(CalendarBoard.class, metadata, inits);
    }

    public QCalendarBoard(Class<? extends CalendarBoard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.creater = inits.isInitialized("creater") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("creater")) : null;
        this.modifier = inits.isInitialized("modifier") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("modifier")) : null;
    }

}

