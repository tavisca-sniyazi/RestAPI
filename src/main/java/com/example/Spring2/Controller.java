package com.example.Spring2;

import com.example.Spring2.model.ToDoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
  @Autowired
    TodoRepo repo;
   @RequestMapping("/find")
    public List<ToDoList> getList(@RequestParam String task){
       List<ToDoList> lists=repo.findByTask(task);
       return lists;
   }
}
