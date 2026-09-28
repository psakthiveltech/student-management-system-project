package com.example.studentproject.dto.CourseDto;

import com.example.studentproject.dto.ParentsDto.GetByIdParentsResponse;

public class GetByIdCourseResponse {

    private Integer courseId;

    private String courseName;

    public GetByIdCourseResponse(){

    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
