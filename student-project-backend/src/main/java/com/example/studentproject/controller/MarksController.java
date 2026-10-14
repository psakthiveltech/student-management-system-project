package com.example.studentproject.controller;

import com.example.studentproject.dto.MarksDto.CreateMarksRequest;
import com.example.studentproject.dto.MarksDto.GetAllMarksRequest;
import com.example.studentproject.dto.MarksDto.GetMarksByIdRequest;
import com.example.studentproject.dto.MarksDto.UpdateMarksResponse;
import com.example.studentproject.repository.MarksRepository;
import com.example.studentproject.service.MarksService;
import com.example.studentproject.student.Marks;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class MarksController {

    private final MarksService marksService;

    public MarksController(MarksService marksService) {

        this.marksService = marksService;
    }

    @GetMapping("/marks")
    public List<GetAllMarksRequest> getAllMarks(){
        return marksService.getAllMarksRequests();
    }

    @GetMapping("/marks/{id}")
    public GetMarksByIdRequest getMarksById(@PathVariable Integer id){
        return marksService.getMarksById(id);
    }

    @PostMapping("/marks")
    public Marks createMarks(@RequestBody CreateMarksRequest mark){
        return marksService.createMarks(mark);
    }

    @PutMapping("/marks/{id}")
    public Marks updateMarks(@PathVariable Integer id, @RequestBody UpdateMarksResponse mark){
        return marksService.updateMarks(id,mark);
    }

    @DeleteMapping("/marks/{id}")
    public String deleteMarkById(@PathVariable Integer id){
        marksService.deleteById(id);
        return "Mark Record Deleted Successfully";
    }

    @DeleteMapping("/marks")
    public String deleteAllMarks(){
        marksService.deleteAllRecord();
        return "All Marks Record Deleted Successfully";
    }

    @GetMapping("/marks/getByStudentId/{studentId}")
    public List<GetAllMarksRequest> getAllMarksByStudentId(@PathVariable Integer studentId){
        return marksService.getMarksByStudentId(studentId);
    }



}
