package com.ssafy.drinkus.util;

import java.security.SecureRandom;
import java.util.Date;
import java.util.List;

public class RandomUtil {

    public static String makeRandomTopic(List<String> topicList) {
        String s = topicList.get((int)(Math.random()*topicList.size()));

        return s;
    }
}
