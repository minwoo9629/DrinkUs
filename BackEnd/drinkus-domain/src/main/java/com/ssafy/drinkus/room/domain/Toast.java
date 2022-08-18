package com.ssafy.drinkus.room.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Toast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "toast_id")
    private Long toastId;

    private String toastContent;
}
