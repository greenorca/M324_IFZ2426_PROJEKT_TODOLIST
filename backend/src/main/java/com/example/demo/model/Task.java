package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** the simplest task 
 * 
 * @author luh
 */
@Entity
@Table(name = "tasks")
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String taskdescription; // must have the EXACT name as his React state property and may not be ignored!

	public Task() {
    }

	public Task(String taskdescription) {
		this.taskdescription = taskdescription;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskdescription() { // do not apply camel-case here! Its a Bean!
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) { // do not apply camel-case here! Its a Bean!
		this.taskdescription = taskdescription;
	}

}