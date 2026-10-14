package com.example.studentproject.dto.SemSubjectDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

public class CreateSemSubjectRequest {


    @NotBlank(message = "The SUBJECT NAME Should Be Filled ")
    private String subjectName;

    @NotBlank(message = "The SUBJECT CODE Should Be Filled")
    private String subjectCode;

    @NotNull(message = "SEMESTER Should Be Filled")
    private Integer semester;

    @NotNull(message = "Course Id Should Be Filled")
    private Integer courseId;

    @NotEmpty(message = "Date Must Be Filled")
    @Past
    private LocalDate date;

    public CreateSemSubjectRequest(){

    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
