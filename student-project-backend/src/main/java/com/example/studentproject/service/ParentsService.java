package com.example.studentproject.service;

import com.example.studentproject.dto.CourseDto.CreateCourseRequest;
import com.example.studentproject.dto.ParentsDto.CreateParentsRequest;
import com.example.studentproject.dto.ParentsDto.GetAllParentsResponse;
import com.example.studentproject.dto.ParentsDto.GetByIdParentsResponse;
import com.example.studentproject.dto.ParentsDto.UpdateParentsRequest;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.ParentsRepository;
import com.example.studentproject.student.ParentsDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParentsService {
    private final ParentsRepository parentsRepository;


    public ParentsService(ParentsRepository parentsRepository) {
        this.parentsRepository = parentsRepository;
    }

    public List<GetAllParentsResponse> findAllParents(){

        List <ParentsDetails> parents  = parentsRepository.findAll();

        List<GetAllParentsResponse> newParents = new ArrayList<>();

        for (ParentsDetails parentsDetails : parents){
            GetAllParentsResponse parentsRequest = new GetAllParentsResponse();

            parentsRequest.setParentId(parentsDetails.getParentId());
            parentsRequest.setNameOfFather(parentsDetails.getNameOfFather());
            parentsRequest.setNameOfMother(parentsDetails.getNameOfMother());
            parentsRequest.setCurrentAddress(parentsDetails.getCurrentAddress());
            parentsRequest.setEmail(parentsDetails.getEmail());
            parentsRequest.setHomeTown(parentsDetails.getHomeTown());
            parentsRequest.setPhoneNumber(parentsDetails.getPhoneNumber());

            newParents.add(parentsRequest);
        }
        return newParents;
    }

    public ParentsDetails createParents(CreateParentsRequest newParents){

        ParentsDetails parentsDetails = new ParentsDetails();

        parentsDetails.setNameOfFather(newParents.getNameOfFather());
        parentsDetails.setNameOfMother(newParents.getNameOfMother());
        parentsDetails.setCurrentAddress(newParents.getCurrentAddress());
        parentsDetails.setHomeTown(newParents.getHomeTown());
        parentsDetails.setPhoneNumber(newParents.getPhoneNumber());
        parentsDetails.setEmail(newParents.getEmail());

        return parentsRepository.save(parentsDetails);
    }

    public GetByIdParentsResponse findByParentsId(Integer id){
        ParentsDetails parents = parentsRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Parents Detail's Not Found Please Update"));

        GetByIdParentsResponse newParents = new GetByIdParentsResponse();

        newParents.setNameOfFather(parents.getNameOfFather());
        newParents.setNameOfMother(parents.getNameOfMother());
        newParents.setCurrentAddress(parents.getCurrentAddress());
        newParents.setHomeTown(parents.getHomeTown());
        newParents.setPhoneNumber(parents.getPhoneNumber());
        newParents.setEmail(parents.getEmail());
        newParents.setParentId(parents.getParentId());

        return newParents;
    }

    public ParentsDetails updateParents(Integer id ,UpdateParentsRequest newParents){

        ParentsDetails oldParents = parentsRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Parents Record Is Not Found Please Update"));

        oldParents.setNameOfMother(newParents.getNameOfMother());
        oldParents.setNameOfFather(newParents.getNameOfFather());
        oldParents.setCurrentAddress(newParents.getCurrentAddress());
        oldParents.setHomeTown(newParents.getHomeTown());
        oldParents.setPhoneNumber(newParents.getPhoneNumber());
        oldParents.setEmail(newParents.getEmail());

        return parentsRepository.save(oldParents);
    }

    public String deleteParentsById(Integer id){
        ParentsDetails parents = parentsRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException("Parents Record Is Not Found "));
        parentsRepository.deleteById(id);
        return "Deleted SuccessFully";
    }

    public void deleteAllParents(){
        parentsRepository.deleteAll();

    }

}
