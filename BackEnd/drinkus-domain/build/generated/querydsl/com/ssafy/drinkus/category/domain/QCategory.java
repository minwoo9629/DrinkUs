package com.ssafy.drinkus.category.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCategory is a Querydsl query type for Category
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCategory extends EntityPathBase<Category> {

    private static final long serialVersionUID = 1539678455L;

    public static final QCategory category = new QCategory("category");

    public final NumberPath<Long> categoryId = createNumber("categoryId", Long.class);

    public final StringPath categoryName = createString("categoryName");

    public final ListPath<com.ssafy.drinkus.room.domain.Room, com.ssafy.drinkus.room.domain.QRoom> roomList = this.<com.ssafy.drinkus.room.domain.Room, com.ssafy.drinkus.room.domain.QRoom>createList("roomList", com.ssafy.drinkus.room.domain.Room.class, com.ssafy.drinkus.room.domain.QRoom.class, PathInits.DIRECT2);

    public final ListPath<SubCategory, QSubCategory> subCategoryList = this.<SubCategory, QSubCategory>createList("subCategoryList", SubCategory.class, QSubCategory.class, PathInits.DIRECT2);

    public QCategory(String variable) {
        super(Category.class, forVariable(variable));
    }

    public QCategory(Path<? extends Category> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCategory(PathMetadata metadata) {
        super(Category.class, metadata);
    }

}

