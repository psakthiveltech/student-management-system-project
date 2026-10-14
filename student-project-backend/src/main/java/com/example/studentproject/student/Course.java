package com.example.studentproject.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer courseId;

    @NotBlank(message = "Course Name Must Be Filled")
    private String courseName;

    @NotNull(message = "Fees Details Must Be Filled")
    private Long fee;

    @NotBlank(message = "Duration Must Be Filled")
    private String duration;





   public Course(){

    }

    public Integer getCourseId() {
        return courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
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
