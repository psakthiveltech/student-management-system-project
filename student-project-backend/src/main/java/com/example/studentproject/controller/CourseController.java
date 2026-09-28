package com.example.studentproject.controller;


import com.example.studentproject.dto.CourseDto.CreateCourseRequest;
import com.example.studentproject.dto.CourseDto.GetAllCourseResponse;
import com.example.studentproject.dto.CourseDto.GetByIdCourseResponse;
import com.example.studentproject.dto.CourseDto.UpdateCourseRequest;
import com.example.studentproject.repository.CourseRepository;
import com.example.studentproject.service.CourseService;
import com.example.studentproject.student.Course;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {

    private final CourseService courseService;


    public CourseController( CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/course")
    public List<GetAllCourseResponse> getAllCourseResponse(){
        return courseService.getAllCourse();
    }

    @GetMapping("/course/{id}")
    public GetByIdCourseResponse getCourseById(@PathVariable Integer id){
        return courseService.getCourseById(id);
    }

    @PostMapping("/course")
    public Course createCourse(@Valid @RequestBody CreateCourseRequest course){
        return courseService.createCourse(course);
    }

    @PutMapping("/course/{id}")
    public Course updateCourse(@PathVariable Integer id, @Valid @RequestBody UpdateCourseRequest newCourse){
        return courseService.updateCourse(id,newCourse);
    }

    @DeleteMapping("/course/{id}")
    public String deleteCourseById(@PathVariable Integer id){
        return courseService.deleteCourseById(id);
    }

    @DeleteMapping("/course")
    public String deleteAllCourse(){
        courseService.deleteAllCourse();
        return "All Course Record Deleted Successfully";
    }
}
