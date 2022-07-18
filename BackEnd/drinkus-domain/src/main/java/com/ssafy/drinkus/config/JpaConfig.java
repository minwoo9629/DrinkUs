package com.ssafy.drinkus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration // 설정파일임을 알려주는 annotation
@EnableJpaAuditing
// 설정 파일 -> 추상클래스에 값을 안넣어도 알아서 현재시간이 넣어짐
// 코드 X -> 존재만으로도 수행
public class JpaConfig {
}
