package com.example.studentproject.repository;

import com.example.studentproject.student.SemSubjects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SemSubjectRepository extends JpaRepository<SemSubjects,Integer> {

    public List<SemSubjects> getByCourse_CourseIdAndSemester(Integer courseId,Integer semesterId);

    public List<SemSubjects> getByCourse_CourseId(Integer courseId);
}
