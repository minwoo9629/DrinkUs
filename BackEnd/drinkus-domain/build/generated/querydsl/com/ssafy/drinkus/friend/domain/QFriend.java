package com.ssafy.drinkus.friend.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFriend is a Querydsl query type for Friend
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFriend extends EntityPathBase<Friend> {

    private static final long serialVersionUID = -1170167241L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFriend friend = new QFriend("friend");

    public final com.ssafy.drinkus.common.QBaseEntity _super = new com.ssafy.drinkus.common.QBaseEntity(this);

    public final com.ssafy.drinkus.chat.domain.QChatRoom chatRoom;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> friendId = createNumber("friendId", Long.class);

    public final com.ssafy.drinkus.user.domain.QUser fromUser;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.ssafy.drinkus.user.domain.QUser toUser;

    public QFriend(String variable) {
        this(Friend.class, forVariable(variable), INITS);
    }

    public QFriend(Path<? extends Friend> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFriend(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFriend(PathMetadata metadata, PathInits inits) {
        this(Friend.class, metadata, inits);
    }

    public QFriend(Class<? extends Friend> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new com.ssafy.drinkus.chat.domain.QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.fromUser = inits.isInitialized("fromUser") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("fromUser")) : null;
        this.toUser = inits.isInitialized("toUser") ? new com.ssafy.drinkus.user.domain.QUser(forProperty("toUser")) : null;
    }

}

