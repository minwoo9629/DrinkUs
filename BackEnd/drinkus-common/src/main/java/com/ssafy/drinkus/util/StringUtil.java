package com.ssafy.drinkus.util;

import java.security.SecureRandom;
import java.util.Date;

public class StringUtil {

    final private static char[] charSet = new char[]{
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};

    private static final int PASSWORD_SIZE = 15;
    final static private int setLength = charSet.length;

    public static String masking(String userName) {
        int nameLen = userName.indexOf("@");
        int halfNameLen = (nameLen / 2) + 1;

        StringBuilder sb = new StringBuilder(userName);
        for (int i = halfNameLen; i < nameLen; i++) {
            sb.setCharAt(i, '*');
        }

        return sb.toString();
    }

    // 비밀번호 랜덤 재생성
    public static String makeNewPassword() {

        StringBuilder sb = new StringBuilder();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        for (int i = 0; i < PASSWORD_SIZE; i++) {
            idx = sr.nextInt(charSet.length);
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    // 난수 생성
    public static String getRandomNumber() {
        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        for (int i = 0; i < 10; i++) {
            // 강력한 난수를 발생시키기 위해 SecureRandom을 사용
            sb.append(charSet[sr.nextInt(setLength)]);
        }
        return sb.toString();
    }
}
