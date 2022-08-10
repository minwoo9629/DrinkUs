package com.ssafy.drinkus.external.nickname;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class RandomNickname {

    public static String makeRandomNickname() throws IOException {
        URL url = new URL("https://nickname.hwanmoo.kr/?format=json&count=1&max_length=12");

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(3000);

        BufferedReader rd;
        if(conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();
        String word = (String) new JSONObject(sb.toString())
                .getJSONArray("words").get(0);
        return word;
    }
}
