package com.example.studentproject.repository;

import com.example.studentproject.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {



    List<Student> findByCourse_CourseName(String courseName);

    List<Student> findByStudentName(String studentName);

    List<Student> findByAgeGreaterThan(Integer age);

    List<Student> findByCourse_CourseNameNotIn(List<String> courseName);

    List<Student> findByAgeLessThan(Integer age);

    List<Student> findByCourse_CourseNameIn(List<String> courseName);

    List<Student> findByCourse_CourseNameAndAgeGreaterThan(String courseName,Integer age);

    List<Student> findByStudentNameContainingIgnoreCase(String studentName);

    List<Student> findByCourse_CourseNameOrderByAgeAsc(String courseName);

    List<Student> findByCourse_CourseNameOrderByAgeDesc(String courseName);

    List<Student> findByCourse_CourseNameOrderByStudentNameAsc(String courseName);

    List<Student> findByCourse_CourseNameOrderByStudentNameDesc(String courseName);

    Long countByCourse_CourseName(String course);

    Boolean existsByStudentName(String studentName);

    @Query("SELECT s FROM Student s WHERE s.course.courseName = :courseName")
    List<Student> getStudentByCourseQuery(@Param("courseName") String courseName);

    @Query("SELECT s FROM Student s WHERE s.course.courseName=:courseName AND s.age>=:age")
            List<Student> getStudentByCourseAndAgeQuery(@Param("courseName") String courseName, @Param("age") Integer age);

    @Query("SELECT s FROM Student s WHERE s.studentName LIKE %:name%")
    List<Student> getStudentByWordQuery(@Param("name") String name);
}