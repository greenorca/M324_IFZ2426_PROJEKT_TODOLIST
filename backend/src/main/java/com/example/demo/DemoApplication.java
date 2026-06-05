package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * This is a demo application that provides a RESTful API for a simple ToDo list
 * with JPA persistence in MySQL database.
 * Spring Data REST automatically exposes CRUD endpoints at /tasks.
 *
 * @author luh
 */
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
