package com.example.studentproject.dto;

public class GetAllStudentResponse {

    private Integer id;
    private String studentName;
    private Integer courseId;
    private Integer age;

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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
