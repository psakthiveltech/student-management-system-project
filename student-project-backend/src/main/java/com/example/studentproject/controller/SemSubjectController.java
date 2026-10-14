package com.example.studentproject.controller;


import com.example.studentproject.dto.SemSubjectDto.CreateSemSubjectRequest;
import com.example.studentproject.dto.SemSubjectDto.GetAllSemSubjectRequest;
import com.example.studentproject.dto.SemSubjectDto.GetSemSubjectByIdRequest;
import com.example.studentproject.dto.SemSubjectDto.UpdateSemSubjectResponse;
import com.example.studentproject.service.SemSubjectService;
import com.example.studentproject.student.SemSubjects;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class SemSubjectController {

    private final SemSubjectService semSubjectService;


    public SemSubjectController(SemSubjectService semSubjectService) {
        this.semSubjectService = semSubjectService;
    }

    @GetMapping("/subject")
    public List<GetAllSemSubjectRequest> getAllSemSubject(){
        return semSubjectService.getAllSemSubject();
    }

    @GetMapping("/subject/{id}")
    public GetSemSubjectByIdRequest getSemSubjectById(@PathVariable Integer id){
        return semSubjectService.getSemSubjectById(id);
    }

    @PostMapping("/subject")
    public SemSubjects createSemSubject(@RequestBody CreateSemSubjectRequest subject){
        return semSubjectService.createSemSubject(subject);
    }

    @PutMapping("/subject/{id}")
    public SemSubjects updateSemSubject(@PathVariable Integer id,@RequestBody
    UpdateSemSubjectResponse subject){
        return semSubjectService.updateSemSubject(id,subject);
    }

    @DeleteMapping("/subject/{id}")
    public String deleteSubjectId(@PathVariable Integer id){
         semSubjectService.deleteById(id);
        return "Deleted Successfully";
    }

    @DeleteMapping("/subject")
    public String deleteAllSubject(){
        semSubjectService.deleteAllRecord();
        return "All Record Removed Successfully";
    }

    @GetMapping("/subject/getByCourseId/{courseId}/semester/{semesterId}")
    public List<GetAllSemSubjectRequest> getSubjectByCourseIdAndSemester(@PathVariable Integer courseId,@PathVariable Integer semesterId){
        return semSubjectService.getSubjectByCourseIdAndSemester(courseId,semesterId);
    }

    @GetMapping("/subject/getByCourseId/{courseId}")
    public List<GetAllSemSubjectRequest> getSubjectByCourseId(@PathVariable Integer courseId){
        return semSubjectService.getSubjectByCourseId(courseId);
    }
}
