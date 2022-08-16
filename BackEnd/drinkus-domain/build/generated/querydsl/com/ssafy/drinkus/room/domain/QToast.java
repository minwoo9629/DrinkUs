package com.ssafy.drinkus.room.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QToast is a Querydsl query type for Toast
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QToast extends EntityPathBase<Toast> {

    private static final long serialVersionUID = 495972497L;

    public static final QToast toast = new QToast("toast");

    public final StringPath toastContent = createString("toastContent");

    public final NumberPath<Long> toastId = createNumber("toastId", Long.class);

    public QToast(String variable) {
        super(Toast.class, forVariable(variable));
    }

    public QToast(Path<? extends Toast> path) {
        super(path.getType(), path.getMetadata());
    }

    public QToast(PathMetadata metadata) {
        super(Toast.class, metadata);
    }

}

