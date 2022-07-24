package com.ssafy.drinkus.email.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDto {
    private String fromAddress;
    private List<String> toAddressList;
    private String title;
    private String content;

    public void initToAddressList(){
        this.toAddressList = new ArrayList<>();
    }

    public void addToAddress(String toAddress){
        if(this.toAddressList == null){
            this.toAddressList = new ArrayList<>();
        }
        this.toAddressList.add(toAddress);
    }
}
