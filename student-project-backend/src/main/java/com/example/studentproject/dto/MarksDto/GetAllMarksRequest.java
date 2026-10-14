package com.example.studentproject.dto.MarksDto;

public class GetAllMarksRequest {

    private Integer id;

    private Integer mark;

    private Integer studentId;

    private Integer semSubjectId;

    private String subjectName;

    private Integer semester;

    private String courseName;

    public GetAllMarksRequest(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getSemSubjectId() {
        return semSubjectId;
    }

    public void setSemSubjectId(Integer semSubjectId) {
        this.semSubjectId = semSubjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
