package com.example.studentproject.dto.ParentsDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateParentsRequest {

    @NotBlank(message = "Father Name Must Be Filled")
    private  String nameOfFather;
    @NotBlank(message = "Mother Name Must Be Filled")
    private String nameOfMother;

    @NotBlank(message = "Phone Number Is Required")
    @Pattern(regexp = "^[0-9]{10}$",message = "Phone Number Must Be Exactly 10 Numbers ")
    private String phoneNumber;

    @NotBlank(message = "Current Address Must Be Filled")
    private String currentAddress;

    @Size(min=5,max = 20)
    @NotBlank(message = "Home Town Is Must Be Filled")
    private String homeTown;

    @NotBlank(message = "Email Must Be Filled")
    @Email(message = "Wrong Email Formate")
    private  String email;

    public UpdateParentsRequest(){

    }

    public String getNameOfFather() {
        return nameOfFather;
    }

    public void setNameOfFather(String nameOfFather) {
        this.nameOfFather = nameOfFather;
    }

    public String getNameOfMother() {
        return nameOfMother;
    }

    public void setNameOfMother(String nameOfMother) {
        this.nameOfMother = nameOfMother;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCurrentAddress() {
        return currentAddress;
    }

    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }

    public String getHomeTown() {
        return homeTown;
    }

    public void setHomeTown(String homeTown) {
        this.homeTown = homeTown;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
