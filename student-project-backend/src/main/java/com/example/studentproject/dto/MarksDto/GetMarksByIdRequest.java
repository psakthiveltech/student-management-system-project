package com.example.studentproject.dto.MarksDto;

public class GetMarksByIdRequest {

    private Integer id;

    private Integer Mark;

    private Integer studentId;

    private Integer semSubjectId;

    public GetMarksByIdRequest(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMark() {
        return Mark;
    }

    public void setMark(Integer mark) {
        Mark = mark;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getSemSubjectId() {
        return semSubjectId;
    }

    public void setSemSubjectId(Integer semSubjectId) {
        this.semSubjectId = semSubjectId;
    }
}
