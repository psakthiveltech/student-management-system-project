package com.example.studentproject.dto.StudentDto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class UpdateStudentRequest {

    @Size(min=3,max=20,message = "NOT-ALLOWED minimum value should be greater than {min} and less than {max}")
    @NotNull(message = "Name Must Be Filled")
    private String studentName;

    @NotNull(message = "Course Id REQUIRED TO FILLED")
    private Integer courseId;

    @Past(message = "Date Of Birth Must In Past")
    @NotNull(message = "Date Of Birth Must Be Filled")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender Must Be Filled")
    @Pattern(regexp = "^(?i)(MALE|FEMALE)$",message = "the value must be MALE OR FEMALE")
    private String gender;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Blood Group REQUIRED TO FILLED")
    private String bloodGroup;

    @NotBlank(message = "Email REQUIRED TO FILLED")
    @Email(message="Wrong Formate")
    private String email;

    @NotNull(message = "Parents Id REQUIRED TO FILLED")
    private Integer parentId;

    @NotBlank(message = "Student Record not empty try to fill with letter's")
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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
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

    public String getStudentRecord(){
        return studentRecord;
    }

    public void setStudentRecord(String studentRecord){
        this.studentRecord=studentRecord;
    }

}