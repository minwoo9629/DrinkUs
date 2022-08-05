package com.ssafy.drinkus.security.oauth;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QOAuth2UserInfo is a Querydsl query type for OAuth2UserInfo
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QOAuth2UserInfo extends BeanPath<OAuth2UserInfo> {

    private static final long serialVersionUID = -185449638L;

    public static final QOAuth2UserInfo oAuth2UserInfo = new QOAuth2UserInfo("oAuth2UserInfo");

    public final MapPath<String, Object, SimplePath<Object>> attributes = this.<String, Object, SimplePath<Object>>createMap("attributes", String.class, Object.class, SimplePath.class);

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userName = createString("userName");

    public final EnumPath<com.ssafy.drinkus.user.domain.type.UserProvider> userProvider = createEnum("userProvider", com.ssafy.drinkus.user.domain.type.UserProvider.class);

    public final StringPath userProviderId = createString("userProviderId");

    public QOAuth2UserInfo(String variable) {
        super(OAuth2UserInfo.class, forVariable(variable));
    }

    public QOAuth2UserInfo(Path<? extends OAuth2UserInfo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOAuth2UserInfo(PathMetadata metadata) {
        super(OAuth2UserInfo.class, metadata);
    }

}

