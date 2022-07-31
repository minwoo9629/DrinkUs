package com.ssafy.drinkus.interest.domain;

import com.ssafy.drinkus.room.domain.Room;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    private String categoryName;

    @OneToMany(mappedBy = "category")
    private List<Room> roomList = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<Interest> interestList = new ArrayList<>();
}
