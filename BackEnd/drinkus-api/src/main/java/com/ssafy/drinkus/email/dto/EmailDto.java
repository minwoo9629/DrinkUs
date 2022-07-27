package com.ssafy.drinkus.email.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@PropertySource("classpath:application.yml")
public class EmailDto {
    @Value("${spring.mail.username}")
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
