package com.example.studentproject.dto.MarksDto;

import com.example.studentproject.dto.CourseDto.UpdateCourseRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class UpdateMarksResponse {
    @Min(0)
    @Max(100)
    @NotNull(message = "MARK Must Be Filled")
    private Integer mark;

    @NotNull(message = "Student Id Not Should Be Empty")
    private Integer studentId;

    @NotNull(message = "Subject Id Not Should Be Empty")
    private Integer semSubjectsId;

    public UpdateMarksResponse(){

    }

    public Integer getMark() {
        return mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getSemSubjectsId() {
        return semSubjectsId;
    }

    public void setSemSubjectsId(Integer semSubjectsId) {
        this.semSubjectsId = semSubjectsId;
    }
}
