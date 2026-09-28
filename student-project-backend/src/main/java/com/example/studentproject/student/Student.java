package com.example.studentproject.student;


import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Student Name Must Be Filled")
    private String studentName;

    @NotNull(message = "Date Of Birth Must Be Filled")
    @Past
    private LocalDate dateOfBirth;

    @NotBlank(message = "Blood Group Must Be Filled")
    private String bloodGroup;

    @NotNull(message = "Gender Must Be Filled")
    @Pattern(regexp = "^(?i)(MALE|FEMALE)$",message = "the value must be MALE OR FEMALE")
    private String gender;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    @Email(message = "Invalid email formate")
    private String email;

    @NotNull(message = "Must Be Filled")
    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    @NotNull(message = "Must Be Filled")
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private ParentsDetails parentsDetails;



    private String studentRecord;

    public Student(){

    }

    public Integer getId(){

        return id;
    }

    public void setId(Integer id ){

        this.id=id;
    }

    public String getStudentName(){

        return studentName;
    }

    public void setStudentName(String name){
        this.studentName = name;
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

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
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

    public ParentsDetails getParentsDetails() {
        return parentsDetails;
    }

    public void setParentsDetails(ParentsDetails parentsDetails) {
        this.parentsDetails = parentsDetails;
    }
}
