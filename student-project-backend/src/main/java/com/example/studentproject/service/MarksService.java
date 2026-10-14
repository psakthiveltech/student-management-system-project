package com.example.studentproject.service;

import com.example.studentproject.dto.MarksDto.CreateMarksRequest;
import com.example.studentproject.dto.MarksDto.GetAllMarksRequest;
import com.example.studentproject.dto.MarksDto.GetMarksByIdRequest;
import com.example.studentproject.dto.MarksDto.UpdateMarksResponse;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.MarksRepository;
import com.example.studentproject.repository.SemSubjectRepository;
import com.example.studentproject.repository.StudentRepository;
import com.example.studentproject.student.Marks;
import com.example.studentproject.student.SemSubjects;
import com.example.studentproject.student.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarksService {

    private final MarksRepository marksRepository;

    private final StudentRepository studentRepository;

    private final SemSubjectRepository semSubjectRepository;

    public MarksService(MarksRepository marksRepository, StudentRepository studentRepository, SemSubjectRepository semSubjectRepository) {
        this.marksRepository = marksRepository;
        this.studentRepository = studentRepository;
        this.semSubjectRepository = semSubjectRepository;
    }

    public List<GetAllMarksRequest> getAllMarksRequests(){

        List<Marks> storedMarks = marksRepository.findAll();

        List<GetAllMarksRequest> sendMarks = new ArrayList<>();

        for(Marks Marks : storedMarks){

            GetAllMarksRequest setMarks = new GetAllMarksRequest();

            setMarks.setId(Marks.getMarkId());

            setMarks.setMark(Marks.getMark());

            setMarks.setSemSubjectId(Marks.getSemSubjects().getSubjectId());

            setMarks.setStudentId(Marks.getStudent().getId());

            setMarks.setSemester(Marks.getSemSubjects().getSemester());

            setMarks.setSubjectName(Marks.getSemSubjects().getSubjectName());

            setMarks.setCourseName(Marks.getStudent().getCourse().getCourseName());

            sendMarks.add(setMarks);
        }

        return sendMarks;
    }

    public GetMarksByIdRequest getMarksById(Integer id){

        Marks marks=marksRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Mark Not Found"));

        GetMarksByIdRequest sendMarks = new GetMarksByIdRequest();

        sendMarks.setId(marks.getMarkId());

        sendMarks.setMark(marks.getMark());

        sendMarks.setSemSubjectId(marks.getSemSubjects().getSubjectId());

        sendMarks.setStudentId(marks.getStudent().getId());

        return sendMarks;
    }

    public Marks createMarks(CreateMarksRequest marks){

        SemSubjects subject = semSubjectRepository.findById(marks.getSemSubjectsId())
                .orElseThrow(()->new StudentNotFoundException("Subject Not Found"));

        Student student = studentRepository.findById(marks.getStudentId())
                .orElseThrow(()->new StudentNotFoundException("Student Not Found"));

        Marks newMarks = new Marks();

        newMarks.setMark(marks.getMark());

        newMarks.setSemSubjects(subject);

        newMarks.setStudent(student);

        return marksRepository.save(newMarks);

    }

    public Marks updateMarks(Integer id, UpdateMarksResponse newMark){

        Marks marks = marksRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Mark Not Found"));

        Student NewStudent = studentRepository.findById(newMark.getStudentId())
                .orElseThrow(()->new StudentNotFoundException("Student Not Found"));

        SemSubjects subject = semSubjectRepository.findById(newMark.getSemSubjectsId())
                .orElseThrow(()->new StudentNotFoundException("Subject Not Found"));

        marks.setMark(newMark.getMark());

        marks.setStudent(NewStudent);

        marks.setSemSubjects(subject);

        return marksRepository.save(marks);

    }

    public void deleteById(Integer id){
        marksRepository.deleteById(id);
    }

    public void deleteAllRecord(){
        marksRepository.deleteAll();
    }

    public List<GetAllMarksRequest> getMarksByStudentId(Integer studentId){

        List<Marks> singleStudentMarks = marksRepository.getByStudentId(studentId);
        List<GetAllMarksRequest> resultMarks = new ArrayList<>();

        for(Marks singleMark : singleStudentMarks){

            GetAllMarksRequest getData = new GetAllMarksRequest();
            getData.setId(singleMark.getMarkId());
            getData.setStudentId(singleMark.getStudent().getId());
            getData.setSubjectName(singleMark.getSemSubjects().getSubjectName());
            getData.setMark(singleMark.getMark());
            getData.setSemester(singleMark.getSemSubjects().getSemester());
            getData.setCourseName(singleMark.getSemSubjects().getCourse().getCourseName());
            getData.setSemSubjectId(singleMark.getSemSubjects().getSubjectId());
            resultMarks.add(getData);

        }
        return resultMarks;
    }
}
