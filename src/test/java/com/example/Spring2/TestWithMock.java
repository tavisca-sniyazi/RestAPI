package com.example.Spring2;

import com.example.Spring2.model.ToDoList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(value=Controller.class)
public class TestWithMock {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private  TodoRepo repo;
    List<ToDoList> mockTasks= new ArrayList<>();
   @Test

       public void getListTest() throws Exception {
           ToDoList task = new ToDoList();
           task.setId(4);
           task.setTask("tinda");
           mockTasks.add(task);
           Mockito.when(repo.findByTask("tinda")).thenReturn(mockTasks);
           mockMvc.perform(get("/find?task=tinda"))
                   .andExpect(status().isOk())
                   .andExpect(content().json("[{'id': 4,'task': 'tinda'}]"));
       }
   }


