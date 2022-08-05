package com.ssafy.drinkus.calendar.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserCalendar is a Querydsl query type for UserCalendar
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserCalendar extends EntityPathBase<UserCalendar> {

    private static final long serialVersionUID = -638177822L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserCalendar userCalendar = new QUserCalendar("userCalendar");

    public final QCalendarBoard calendarBoard;

    public final com.ssafy.drinkus.user.domain.QUser user;

    public final NumberPath<Long> userCalendarId = createNumber("userCalendarId", Long.class);

    public QUserCalendar(String variable) {
        this(UserCalendar.class, forVariable(variable), INITS);
    }

    public QUserCalendar(Path<? extends UserCalendar> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserCalendar(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserCalendar(PathMetadata metadata, PathInits inits) {
        this(UserCalendar.class, metadata, inits);
    }

    public QUserCalendar(Class<? extends UserCalendar> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.calendarBoard = inits.isInitialized("calendarBoard") ? new QCalendarBoard(forProperty("calendarBoard"), inits.get("calendarBoard")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("user")) : null;
    }

}

