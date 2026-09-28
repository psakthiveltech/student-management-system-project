package com.example.studentproject.dto.CourseDto;

public class GetAllCourseResponse {

    private Integer courseId;

    private String courseName;

    public GetAllCourseResponse(){

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
