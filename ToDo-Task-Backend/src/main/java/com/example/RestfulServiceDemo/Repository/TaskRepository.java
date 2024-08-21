package com.example.RestfulServiceDemo.Repository;

import com.example.RestfulServiceDemo.DAO_Layer.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends MongoRepository<Task,String> {

}
