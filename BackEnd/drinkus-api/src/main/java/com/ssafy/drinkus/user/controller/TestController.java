package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final UserService userService;

    @GetMapping("/login")
    public @ResponseBody void login(Authentication authentication){
        System.out.println("### /test/login ###");
        System.out.println("authentication = " + authentication);
//        System.out.println("authentication.getPrincipal() = " + authentication.getPrincipal());

    }
}
