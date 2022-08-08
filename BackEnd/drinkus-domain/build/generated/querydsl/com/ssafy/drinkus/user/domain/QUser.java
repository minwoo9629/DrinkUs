package com.ssafy.drinkus.user.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1591484177L;

    public static final QUser user = new QUser("user");

    public final com.ssafy.drinkus.common.QBaseEntity _super = new com.ssafy.drinkus.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final ListPath<com.ssafy.drinkus.room.domain.RoomHistory, com.ssafy.drinkus.room.domain.QRoomHistory> roomHistoryList = this.<com.ssafy.drinkus.room.domain.RoomHistory, com.ssafy.drinkus.room.domain.QRoomHistory>createList("roomHistoryList", com.ssafy.drinkus.room.domain.RoomHistory.class, com.ssafy.drinkus.room.domain.QRoomHistory.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.drinkus.room.domain.Room, com.ssafy.drinkus.room.domain.QRoom> roomList = this.<com.ssafy.drinkus.room.domain.Room, com.ssafy.drinkus.room.domain.QRoom>createList("roomList", com.ssafy.drinkus.room.domain.Room.class, com.ssafy.drinkus.room.domain.QRoom.class, PathInits.DIRECT2);

    public final NumberPath<Integer> userBeer = createNumber("userBeer", Integer.class);

    public final StringPath userBirthday = createString("userBirthday");

    public final EnumPath<com.ssafy.drinkus.common.type.YN> userDeleted = createEnum("userDeleted", com.ssafy.drinkus.common.type.YN.class);

    public final DateTimePath<java.time.LocalDateTime> userDeleteDate = createDateTime("userDeleteDate", java.time.LocalDateTime.class);

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userFullname = createString("userFullname");

    public final StringPath userGrade = createString("userGrade");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath userImg = createString("userImg");

    public final StringPath userIntroduce = createString("userIntroduce");

    public final StringPath userName = createString("userName");

    public final StringPath userNickname = createString("userNickname");

    public final NumberPath<Long> userPoint = createNumber("userPoint", Long.class);

    public final NumberPath<Integer> userPopularity = createNumber("userPopularity", Integer.class);

    public final NumberPath<Integer> userPopularityLimit = createNumber("userPopularityLimit", Integer.class);

    public final EnumPath<com.ssafy.drinkus.user.domain.type.UserProvider> userProvider = createEnum("userProvider", com.ssafy.drinkus.user.domain.type.UserProvider.class);

    public final StringPath userProviderId = createString("userProviderId");

    public final StringPath userPw = createString("userPw");

    public final EnumPath<com.ssafy.drinkus.user.domain.type.UserRole> userRole = createEnum("userRole", com.ssafy.drinkus.user.domain.type.UserRole.class);

    public final NumberPath<Integer> userSoju = createNumber("userSoju", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> userStopDate = createDateTime("userStopDate", java.time.LocalDateTime.class);

    public final ListPath<UserSubCategory, QUserSubCategory> userSubCategoryList = this.<UserSubCategory, QUserSubCategory>createList("userSubCategoryList", UserSubCategory.class, QUserSubCategory.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

