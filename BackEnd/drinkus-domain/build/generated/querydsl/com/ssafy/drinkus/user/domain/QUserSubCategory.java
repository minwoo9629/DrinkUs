package com.ssafy.drinkus.user.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserSubCategory is a Querydsl query type for UserSubCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserSubCategory extends EntityPathBase<UserSubCategory> {

    private static final long serialVersionUID = -1170422899L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserSubCategory userSubCategory = new QUserSubCategory("userSubCategory");

    public final com.ssafy.drinkus.category.domain.QSubCategory subCategory;

    public final QUser user;

    public final NumberPath<Long> userSubCategoryId = createNumber("userSubCategoryId", Long.class);

    public QUserSubCategory(String variable) {
        this(UserSubCategory.class, forVariable(variable), INITS);
    }

    public QUserSubCategory(Path<? extends UserSubCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserSubCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserSubCategory(PathMetadata metadata, PathInits inits) {
        this(UserSubCategory.class, metadata, inits);
    }

    public QUserSubCategory(Class<? extends UserSubCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.subCategory = inits.isInitialized("subCategory") ? new com.ssafy.drinkus.category.domain.QSubCategory(forProperty("subCategory"), inits.get("subCategory")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

