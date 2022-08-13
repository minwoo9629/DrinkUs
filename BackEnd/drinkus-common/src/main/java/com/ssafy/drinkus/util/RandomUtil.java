package com.ssafy.drinkus.util;

import java.util.List;
import java.util.Map;

public class RandomUtil {

    public static String makeRandomTopic(List<String> topicList) {
        String s = topicList.get((int) (Math.random() * topicList.size()));
        return s;
    }

    public static Long makeRandomDrinkUserId(Map<String, String> users, Map<String, Long> SESSION_USER_ID) {
        int rand = (int) (Math.random() * users.size());
        return SESSION_USER_ID.get(users.get((users.keySet().toArray())[rand]));
    }
}
