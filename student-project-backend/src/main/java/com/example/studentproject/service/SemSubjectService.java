package com.example.studentproject.service;


import com.example.studentproject.dto.SemSubjectDto.CreateSemSubjectRequest;
import com.example.studentproject.dto.SemSubjectDto.GetAllSemSubjectRequest;
import com.example.studentproject.dto.SemSubjectDto.GetSemSubjectByIdRequest;
import com.example.studentproject.dto.SemSubjectDto.UpdateSemSubjectResponse;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.CourseRepository;
import com.example.studentproject.repository.SemSubjectRepository;
import com.example.studentproject.student.Course;
import com.example.studentproject.student.SemSubjects;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SemSubjectService {

    private final SemSubjectRepository semSubjectRepository;

    private final CourseRepository courseRepository;


    public SemSubjectService(SemSubjectRepository semSubjectRepository, CourseRepository courseRepository) {

        this.semSubjectRepository = semSubjectRepository;
        this.courseRepository = courseRepository;
    }

    public List<GetAllSemSubjectRequest> getAllSemSubject(){

        List<SemSubjects> AllSubjects = semSubjectRepository.findAll();

        List<GetAllSemSubjectRequest> Subjects = new ArrayList<>();

        for(SemSubjects storedSubject : AllSubjects){
            GetAllSemSubjectRequest sendSubject= new GetAllSemSubjectRequest();

            sendSubject.setId(storedSubject.getSubjectId());

            sendSubject.setSubjectName(storedSubject.getSubjectName());

            sendSubject.setSubjectCode(storedSubject.getSubjectCode());

            sendSubject.setSemester(storedSubject.getSemester());

            sendSubject.setDate(storedSubject.getDate());

            sendSubject.setCourseId(storedSubject.getCourse().getCourseId());

            Subjects.add(sendSubject);
        }
        return Subjects;
    }

    public GetSemSubjectByIdRequest getSemSubjectById(Integer id){

        SemSubjects semSubjects = semSubjectRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Subject Not Found"));
        GetSemSubjectByIdRequest Subject = new GetSemSubjectByIdRequest();

        Subject.setId(semSubjects.getSubjectId());

        Subject.setSubjectName(semSubjects.getSubjectName());

        Subject.setSubjectCode(semSubjects.getSubjectCode());

        Subject.setDate(semSubjects.getDate());

        Subject.setCourseId(semSubjects.getCourse().getCourseId());

        return Subject;
    }

    public SemSubjects createSemSubject(CreateSemSubjectRequest subject){

        SemSubjects newSubject = new SemSubjects();

        Course course = courseRepository.findById(subject.getCourseId())
                        .orElseThrow(()->new StudentNotFoundException("Course Not Found"));

        newSubject.setSubjectName(subject.getSubjectName());

        newSubject.setSubjectCode(subject.getSubjectCode());

        newSubject.setSemester(subject.getSemester());

        newSubject.setCourse(course);

        newSubject.setDate(subject.getDate());


        return semSubjectRepository.save(newSubject);
    }

    public SemSubjects updateSemSubject(Integer id, UpdateSemSubjectResponse newSemSubject){
        SemSubjects oldSubject = semSubjectRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Subject Not Found"));

        Course course = courseRepository.findById(newSemSubject.getCourseId())
                .orElseThrow(()->new StudentNotFoundException("Course Not Found"));




        oldSubject.setSubjectName(newSemSubject.getSubjectName());

        oldSubject.setSubjectCode(newSemSubject.getSubjectCode());

        oldSubject.setDate(newSemSubject.getDate());

        oldSubject.setSemester(newSemSubject.getSemester());

        oldSubject.setCourse(course);

        return semSubjectRepository.save(oldSubject);

    }

    public void deleteById(Integer id){
        semSubjectRepository.deleteById(id);
    }

    public void deleteAllRecord(){
        semSubjectRepository.deleteAll();
    }

    public List<GetAllSemSubjectRequest> getSubjectByCourseIdAndSemester(Integer courseId,Integer semesterId){

        List<SemSubjects> repoResponse = semSubjectRepository.getByCourse_CourseIdAndSemester(courseId,semesterId);

        List<GetAllSemSubjectRequest> allSubjectDetails = new ArrayList<>();

        for(SemSubjects AllRecord : repoResponse){
            GetAllSemSubjectRequest subjectDetails = new GetAllSemSubjectRequest();

            subjectDetails.setCourseId(AllRecord.getCourse().getCourseId());
            subjectDetails.setSubjectName(AllRecord.getSubjectName());
            subjectDetails.setCourseName(AllRecord.getCourse().getCourseName());
            subjectDetails.setDate(AllRecord.getDate());
            subjectDetails.setSubjectCode(AllRecord.getSubjectCode());
            subjectDetails.setSemester(AllRecord.getSemester());
            subjectDetails.setId(AllRecord.getSubjectId());
            allSubjectDetails.add(subjectDetails);
        }

        return allSubjectDetails;
    }

    public List<GetAllSemSubjectRequest> getSubjectByCourseId(Integer courseId){

        List<SemSubjects> subjectsData = semSubjectRepository.getByCourse_CourseId(courseId);

        List<GetAllSemSubjectRequest> responseSubjects = new ArrayList<>();

        for(SemSubjects repositoryResponse : subjectsData){

            GetAllSemSubjectRequest  returnSub = new GetAllSemSubjectRequest();

            returnSub.setSemester(repositoryResponse.getSemester());
            returnSub.setSubjectCode(repositoryResponse.getSubjectCode());
            returnSub.setDate(repositoryResponse.getDate());
            returnSub.setCourseName(repositoryResponse.getCourse().getCourseName());
            returnSub.setSubjectName(repositoryResponse.getSubjectName());
            returnSub.setCourseId(repositoryResponse.getCourse().getCourseId());
            returnSub.setId(repositoryResponse.getSubjectId());

            responseSubjects.add(returnSub);
        }

        return responseSubjects;

    }
}
