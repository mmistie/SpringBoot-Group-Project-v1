package org.meghna.orders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication
@ComponentScan(basePackages = {"org.meghna.orders", "org.meghna.products"},
        excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = "org\\.meghna\\.orders\\.config\\..*"))
public class OrdersApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrdersApplication.class, args);
    }
}
