package com.example.studentproject.dto.StudentDto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class CreateStudentRequest {

    @NotBlank(message = "Name Must Be Filled")
    @Size(min=3,max=20,message = "NOT-ALLOWED minimum value should be greater than {min} and less than {max}")
    private String studentName;

    @NotNull(message = "Course Id must be filled")
    private Integer courseId;

    @Past
    @NotNull(message = "Date Of Birth must be filled")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Blood Group must be filled")
    private String bloodGroup;

    @NotNull(message = "Gender must be filled")
    @Pattern(regexp = "^(?i)(MALE|FEMALE)$",message = "the value must be MALE OR FEMALE")
    private String gender;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    @NotNull(message = "Email must be filled")
    @Email(message = " Invalid email formate")
    private String email;

    @NotNull(message = "Parent Id FIELD REQUIRED TO FILLED")
    private Integer parentId;

    @NotBlank(message = "the studentRecord must be filled")
    private String studentRecord;

    public CreateStudentRequest(){

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

    public String getStudentRecord(){
        return studentRecord;
    }

    public void setStudentRecord(String record){
        this.studentRecord=record;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

}