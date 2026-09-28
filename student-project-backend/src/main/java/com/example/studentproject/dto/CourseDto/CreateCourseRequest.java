package com.example.studentproject.dto.CourseDto;

import jakarta.validation.constraints.NotBlank;

public class CreateCourseRequest {

    @NotBlank(message = "Course Name Is Not Be Empty")
    private String courseName;

    public CreateCourseRequest(){

    }



    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
