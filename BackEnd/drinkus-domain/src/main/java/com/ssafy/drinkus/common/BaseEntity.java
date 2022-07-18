package com.ssafy.drinkus.common;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass // 상위클래스 상속받는 annotation (extends)
@EntityListeners(AuditingEntityListener.class) //now()가 가능하게끔 하는 annotation
@Getter
//모든 엔티티에 적용할 수 있는 엔티티 (생성일자, 수정일자)
//  -> 추상클래스
public abstract class BaseEntity {

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

}
