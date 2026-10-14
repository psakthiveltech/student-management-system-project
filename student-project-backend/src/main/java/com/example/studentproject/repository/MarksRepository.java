package com.example.studentproject.repository;

import com.example.studentproject.student.Marks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarksRepository extends JpaRepository<Marks,Integer> {

    public List<Marks> getByStudentId(Integer studentId);
}
