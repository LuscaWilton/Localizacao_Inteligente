package com.faculdade.localizacaointeligente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.faculdade.localizacaointeligente")
public class LocalizacaointeligenteApplication {

    public static void main(String[] args) {
        SpringApplication.run(LocalizacaointeligenteApplication.class, args);
    }
}