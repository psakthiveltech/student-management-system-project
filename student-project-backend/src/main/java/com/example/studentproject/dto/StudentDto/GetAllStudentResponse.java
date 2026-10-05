package com.example.studentproject.dto.StudentDto;

import java.time.LocalDate;

public class GetAllStudentResponse {

    private Integer id;
    private String studentName;
    private Integer courseId;
    private LocalDate dateOfBirth;
    private String gender;
    private String phoneNumber;
    private String bloodGroup;
    private String email;
    private Integer parentId;
    private String studentRecord;

   public GetAllStudentResponse(){

   }
   public Integer getId(){
       return id;
   }

   public void setId(Integer id){
       this.id=id;
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

    public String getStudentRecord() {
        return studentRecord;
    }

    public void setStudentRecord(String studentRecord) {
        this.studentRecord = studentRecord;
    }
}
