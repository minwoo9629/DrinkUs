package com.ssafy.drinkus.room.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = 2094149937L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final com.ssafy.drinkus.common.QBaseEntity _super = new com.ssafy.drinkus.common.QBaseEntity(this);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages20 = createEnum("ages20", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages30 = createEnum("ages30", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages40 = createEnum("ages40", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages50 = createEnum("ages50", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages60 = createEnum("ages60", com.ssafy.drinkus.common.type.YN.class);

    public final EnumPath<com.ssafy.drinkus.common.type.YN> ages70 = createEnum("ages70", com.ssafy.drinkus.common.type.YN.class);

    public final com.ssafy.drinkus.category.domain.QCategory category;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final ListPath<com.ssafy.drinkus.friend.domain.Friend, com.ssafy.drinkus.friend.domain.QFriend> fromFriends = this.<com.ssafy.drinkus.friend.domain.Friend, com.ssafy.drinkus.friend.domain.QFriend>createList("fromFriends", com.ssafy.drinkus.friend.domain.Friend.class, com.ssafy.drinkus.friend.domain.QFriend.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Integer> peopleLimit = createNumber("peopleLimit", Integer.class);

    public final StringPath placeTheme = createString("placeTheme");

    public final ListPath<RoomHistory, QRoomHistory> roomHistories = this.<RoomHistory, QRoomHistory>createList("roomHistories", RoomHistory.class, QRoomHistory.class, PathInits.DIRECT2);

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final StringPath roomName = createString("roomName");

    public final StringPath roomPw = createString("roomPw");

    public final ListPath<com.ssafy.drinkus.friend.domain.Friend, com.ssafy.drinkus.friend.domain.QFriend> toFriends = this.<com.ssafy.drinkus.friend.domain.Friend, com.ssafy.drinkus.friend.domain.QFriend>createList("toFriends", com.ssafy.drinkus.friend.domain.Friend.class, com.ssafy.drinkus.friend.domain.QFriend.class, PathInits.DIRECT2);

    public final com.ssafy.drinkus.user.domain.QUser user;

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new com.ssafy.drinkus.category.domain.QCategory(forProperty("category")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("user")) : null;
    }

}

