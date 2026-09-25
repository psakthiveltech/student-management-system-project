package com.example.studentproject.repository;

import com.example.studentproject.student.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course,Integer> {
}
