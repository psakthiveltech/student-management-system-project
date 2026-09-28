package com.example.studentproject.service;

import com.example.studentproject.dto.CourseDto.CreateCourseRequest;
import com.example.studentproject.dto.CourseDto.GetAllCourseResponse;
import com.example.studentproject.dto.CourseDto.GetByIdCourseResponse;
import com.example.studentproject.dto.CourseDto.UpdateCourseRequest;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.CourseRepository;
import com.example.studentproject.student.Course;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<GetAllCourseResponse> getAllCourse(){
        List<Course> courses = courseRepository.findAll();

        List<GetAllCourseResponse> courseNew = new ArrayList<>();

        for(Course allCourse : courses){

            GetAllCourseResponse course = new GetAllCourseResponse();
            course.setCourseId(allCourse.getCourseId());
            course.setCourseName(allCourse.getCourseName());

            courseNew.add(course);
        }

        return courseNew;

    }

    public GetByIdCourseResponse getCourseById(Integer id){
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Course Not Found"));

        GetByIdCourseResponse course = new GetByIdCourseResponse();

        course.setCourseId(existingCourse.getCourseId());

        course.setCourseName(existingCourse.getCourseName());

        return course;
    }

    public Course updateCourse(Integer id, UpdateCourseRequest courseNew){

        Course oldCourse = courseRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Course Not Found"));

        oldCourse.setCourseName(courseNew.getCourseName());

        return courseRepository.save(oldCourse);
    }

    public Course createCourse(CreateCourseRequest courseNew){
        Course course = new Course();

        course.setCourseName(courseNew.getCourseName());

        return courseRepository.save(course);
    }

    public String deleteCourseById(Integer id){
        courseRepository.deleteById(id);
        return "Deleted Successfully";
    }

    public void deleteAllCourse(){
        courseRepository.deleteAll();
    }
}
