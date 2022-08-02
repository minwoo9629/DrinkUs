package com.ssafy.drinkus.email.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Email {
    private String fromAddress;
    private List<String> toAddressList;
    private String title;
    private String content;

    public void addToAddress(String toAddress){
        if(this.toAddressList == null){
            this.toAddressList = new ArrayList<>();
        }
        this.toAddressList.add(toAddress);
    }
}
