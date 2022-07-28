package com.ssafy.drinkus.interest;

import com.ssafy.drinkus.room.Room;
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

    @OneToMany(mappedBy = "category_first")
    private List<Room> roomFirst = new ArrayList<>();

    @OneToMany(mappedBy = "category_second")
    private List<Room> roomSecond = new ArrayList<>();

    @OneToMany(mappedBy = "category_third")
    private List<Room> roomThird = new ArrayList<>();
}
