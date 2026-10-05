package com.example.studentproject.controller;


import com.example.studentproject.dto.StudentDto.CreateStudentRequest;
import com.example.studentproject.dto.StudentDto.GetAllStudentResponse;
import com.example.studentproject.dto.StudentDto.GetByIdStudentReponse;
import com.example.studentproject.dto.StudentDto.UpdateStudentRequest;
import com.example.studentproject.service.StudentService;
import com.example.studentproject.student.Student;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins =  "*")
public class StudentController {

    private final StudentService studentservice;

    public StudentController(StudentService studentservice){
        this.studentservice=studentservice;
    }

    @GetMapping("/student")
    public List<GetAllStudentResponse> getAllStudent(){

        return studentservice.findAllStudent();
    }

    @GetMapping("/student/{id}")
    public GetByIdStudentReponse getStudentById(@PathVariable Integer id){

        return studentservice.getStudentById(id);
    }

    @PostMapping("/student")
    public Student createStudent(@Valid @RequestBody CreateStudentRequest request){
        return  studentservice.createStudent(request);

    }



    @PutMapping("/student/{id}")
    public Student updateStudent( @PathVariable Integer id,
                                  @Valid @RequestBody UpdateStudentRequest newStudent){
        return studentservice.updateStudent(id,newStudent);
    }

    @DeleteMapping("/student/{id}")
    public String deleteStudent(@PathVariable Integer id){
        studentservice.deleteStudent(id);
        return "DELETED SUCCESSFULLY 👍";
    }

    @DeleteMapping("/student")
    public String deleteAllStudent(){
        studentservice.deleteAllStudent();
        return "All Record Deleted Successfully";
    }

    // spring data jpa methods

    @GetMapping("/student/course/{course}")
    public List<Student> getStudentByCourse(@PathVariable String course){
        return studentservice.findStudentByCourse(course);
    }

    @GetMapping("/student/studentName/{studentName}")

    public List<Student> getStudentByStudentName(@PathVariable String studentName){
        return studentservice.findStudentByStudentName(studentName);
    }


    @GetMapping("/student/courseNotIn")
    public List<Student> getStudentCourseNotIn(@RequestParam("courseNotIn") List<String> course ){
        return studentservice.findStudentCourseNotIn(course);
    }

    @GetMapping("/student/courseIn")
    public List<Student> getStudentByCourseIn(@RequestParam("courseIn") List<String> course){
        return studentservice.findStudentByCourseIn(course);
    }

    @GetMapping("/student/student-Name/{studentName}")
    public List<Student> findStudentNameByContainingIgnoreCase(@PathVariable String studentName){
        return studentservice.findStudentNameByContainsIgnoreCase(studentName);
    }

    @GetMapping("/student/courseOrderByNameAsc/{course}")
    public List<Student> findCourseOrderByStudentNameAsc(@PathVariable String course){
        return studentservice.findCourseOrderByStudentNameAsc(course);
    }

    @GetMapping("/student/courseOrderByNameDesc/{course}")
    public List<Student> findCourseOrderByStudentNameDesc(@PathVariable String course){
        return studentservice.findCourseOrderByStudentNameDesc(course);
    }

    @GetMapping("/student/countCourse/{course}")
    public Long countCourse(@PathVariable String course){
        return studentservice.countCourse(course);
    }

    @GetMapping("/student/existsStudentName/{studentName}")
    public Boolean existsStudentNameOrNot(@PathVariable String studentName ){
        return studentservice.existsStudentNameOrNot(studentName);
    }

    @GetMapping("/student/query/course/{course}")
    public List<Student> getStudentByCourseByQuery(@PathVariable String course){
        return studentservice.getStudentByCourseByQuery(course);
    }

    @GetMapping("/student/parentId/{id}")
    public List<Student> getStudentByParentsId(@PathVariable Integer id){
        return studentservice.getStudentByParentsId(id);
    }

    @GetMapping("/student/query/StudentNameWord/{name}")
    public List<Student> getStudentByStudentWordQuery(@PathVariable String name){
        return studentservice.getStudentByWordByQuery(name);
    }
}