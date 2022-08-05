package com.ssafy.drinkus.room.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoomHistory is a Querydsl query type for RoomHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomHistory extends EntityPathBase<RoomHistory> {

    private static final long serialVersionUID = 1763099171L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoomHistory roomHistory = new QRoomHistory("roomHistory");

    public final com.ssafy.drinkus.common.QBaseEntity _super = new com.ssafy.drinkus.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final QRoom room;

    public final NumberPath<Long> RoomHistoryId = createNumber("RoomHistoryId", Long.class);

    public final com.ssafy.drinkus.user.domain.QUser user;

    public QRoomHistory(String variable) {
        this(RoomHistory.class, forVariable(variable), INITS);
    }

    public QRoomHistory(Path<? extends RoomHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoomHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoomHistory(PathMetadata metadata, PathInits inits) {
        this(RoomHistory.class, metadata, inits);
    }

    public QRoomHistory(Class<? extends RoomHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room"), inits.get("room")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("user")) : null;
    }

}

