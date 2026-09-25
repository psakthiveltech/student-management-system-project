package com.example.studentproject.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateStudentRequest {

    @Size(min=3,max=20,message = "NOT-ALLOWED minimum value should be greater than {min} and less than {max}")
    private String studentName;


    private Integer courseId;

    @Min(value = 18,message = "the age should be greater than {value}")
    private Integer age;

    @NotBlank(message = "this field not empty try to fill with letter's")
    private String studentRecord;

    public UpdateStudentRequest(){

    }

    public String getStudentName(){
        return studentName;
    }

    public void setStudentName(String studentName){
        this.studentName=studentName;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getStudentRecord(){
        return studentRecord;
    }

    public void setStudentRecord(String studentRecord){
        this.studentRecord=studentRecord;
    }

}