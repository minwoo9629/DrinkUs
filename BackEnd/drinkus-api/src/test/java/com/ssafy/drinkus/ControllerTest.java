package com.ssafy.drinkus;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.drinkus.config.LoginUserArgumentResolver;
import com.ssafy.drinkus.security.filter.JwtAuthenticationFilter;
import com.ssafy.drinkus.security.handler.CustomAccessDeniedHandler;
import com.ssafy.drinkus.security.handler.CustomAuthenticationEntryPoint;
import com.ssafy.drinkus.security.service.CustomUserDetailsService;
import com.ssafy.drinkus.security.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public abstract class ControllerTest {

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected JwtUtil jwtUtil;

    @MockBean
    protected CustomUserDetailsService customUserDetailsService;

    @MockBean
    protected LoginUserArgumentResolver loginUserArgumentResolver;

    @MockBean
    protected CustomAccessDeniedHandler accessDeniedHandler;

    @MockBean
    protected CustomAuthenticationEntryPoint authenticationEntryPoint;

    protected MockMvc mockMvc;

    @BeforeEach
    void setUp(WebApplicationContext wac, RestDocumentationContextProvider restDocumentationContextProvider) {
        JwtAuthenticationFilter jwtAuthenticationFilter = (JwtAuthenticationFilter) wac.getBean("jwtAuthenticationFilter");

        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .alwaysDo(print())
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .addFilter(jwtAuthenticationFilter)
                .apply(documentationConfiguration(restDocumentationContextProvider)
                        .operationPreprocessors()
                        .withRequestDefaults(prettyPrint())
                        .withResponseDefaults(prettyPrint()))
                .build();

    }
}