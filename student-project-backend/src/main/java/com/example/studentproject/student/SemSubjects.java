package com.example.studentproject.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
public class SemSubjects {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer SubjectId;


    @NotBlank(message = "The SUBJECT NAME Should Be Filled ")
    private String subjectName;

    @NotBlank(message = "The SUBJECT CODE Should Be Filled")
    private String subjectCode;

    @NotNull(message = "SEMESTER Should Be Filled")
    @Min(1)
    @Max(6)
    private Integer semester;

    @ManyToOne
    @JoinColumn( name="course_id")
    private Course course;

    @NotNull(message = "Date Must Be Filled")
    @Past
    private LocalDate date;

    public SemSubjects(){


    }

    public Integer getSubjectId() {
        return SubjectId;
    }

    public void setSubjectId(Integer subjectId) {
        SubjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
