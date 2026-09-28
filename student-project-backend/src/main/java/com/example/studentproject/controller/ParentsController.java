package com.example.studentproject.controller;

import com.example.studentproject.dto.ParentsDto.CreateParentsRequest;
import com.example.studentproject.dto.ParentsDto.GetAllParentsResponse;
import com.example.studentproject.dto.ParentsDto.GetByIdParentsResponse;
import com.example.studentproject.dto.ParentsDto.UpdateParentsRequest;
import com.example.studentproject.service.ParentsService;
import com.example.studentproject.student.ParentsDetails;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ParentsController {

    private final ParentsService parentsService;

    public ParentsController(ParentsService parentsService){

        this.parentsService = parentsService;
    }

    @GetMapping("/parents")
    public List<GetAllParentsResponse> getAllParents(){
        return parentsService.findAllParents();
    }

    @GetMapping("/parents/{id}")
    public GetByIdParentsResponse getByParentsId(@PathVariable Integer id){
        return parentsService.findByParentsId(id);
    }

    @PostMapping("/parents")
    public ParentsDetails createParents(@Valid @RequestBody CreateParentsRequest parents){
        return parentsService.createParents(parents);
    }

    @PutMapping("/parents/{id}")
    public ParentsDetails updateParents(@PathVariable Integer id,@Valid @RequestBody UpdateParentsRequest updatedParents){
        return parentsService.updateParents(id,updatedParents);
    }

    @DeleteMapping("/parents/{id}")
    public String DeleteParentsById(@PathVariable Integer id){
        return parentsService.deleteParentsById(id);
    }

    @DeleteMapping("/parents")

    public String DeleteAllParents(){
        parentsService.deleteAllParents();
        return "All Record Deleted SuccessFully";
    }


}
