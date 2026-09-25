package com.example.studentproject.student;


import jakarta.persistence.*;
import jakarta.validation.Valid;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String studentName;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    private Integer age;

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

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
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

    public void setStudentRecord(String record){
        this.studentRecord=record;
    }


}
