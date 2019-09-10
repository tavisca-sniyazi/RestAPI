package com.example.Spring2;

import com.example.Spring2.model.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "list",path = "list")
public interface TodoRepo extends JpaRepository<ToDoList,Integer> {

}
