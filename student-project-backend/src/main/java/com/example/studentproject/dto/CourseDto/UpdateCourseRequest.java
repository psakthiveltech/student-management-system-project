package com.example.studentproject.dto.CourseDto;

import jakarta.validation.constraints.NotBlank;

public class UpdateCourseRequest {

    @NotBlank(message = "Course Name Should Be Filled")
    private String courseName;

    public UpdateCourseRequest(){

    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
