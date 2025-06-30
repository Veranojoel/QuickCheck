package com.june25.june25;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = {"com.june25.june25"})
@EntityScan("com.june25.june25.entity")
public class June25Application {
    public static void main(String[] args) {
        SpringApplication.run(June25Application.class, args);
    }
}