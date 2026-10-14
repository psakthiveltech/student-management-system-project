package com.example.studentproject.dto.CourseDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateCourseRequest {

    @NotBlank(message = "Course Name Should Be Filled")
    private String courseName;

    @NotNull(message = "Fees Details Must Be Filled")
    private Long fee;

    @NotBlank(message = "Duration Must Be Filled")
    private String duration;

    public UpdateCourseRequest(){

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
