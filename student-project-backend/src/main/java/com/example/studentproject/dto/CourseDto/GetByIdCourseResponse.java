package com.example.studentproject.dto.CourseDto;

import com.example.studentproject.dto.ParentsDto.GetByIdParentsResponse;

public class GetByIdCourseResponse {

    private Integer courseId;

    private String courseName;

    private Long fee;

    private String duration;

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

    public Long getFee() {
        return fee;
    }

    public void setFee(Long fee) {
        this.fee = fee;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}
