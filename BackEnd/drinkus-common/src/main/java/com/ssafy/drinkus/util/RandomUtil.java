package com.ssafy.drinkus.util;

import java.util.List;
import java.util.Map;

public class RandomUtil {

    public static String makeRandomTopic(List<String> topicList) {
        String s = topicList.get((int) (Math.random() * topicList.size()));
        return s;
    }

    public static Long makeRandomDrinkUserId(Map<String, Long> users) {
        int rand = (int) (Math.random() * users.size());
        return users.get((users.keySet().toArray())[rand]);
    }
}
