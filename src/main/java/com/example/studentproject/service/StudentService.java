package com.example.studentproject.service;


import com.example.studentproject.dto.CreateStudentRequest;
import com.example.studentproject.dto.GetAllStudentResponse;
import com.example.studentproject.dto.GetByIdStudentReponse;
import com.example.studentproject.dto.UpdateStudentRequest;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.CourseRepository;
import com.example.studentproject.repository.StudentRepository;
import com.example.studentproject.student.Course;
import com.example.studentproject.student.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentrepository;
    private final CourseRepository courseRepository;

    public StudentService (StudentRepository studentrepository, CourseRepository courseRepository){
        this.studentrepository = studentrepository;
        this.courseRepository = courseRepository;
    }

    public Student createStudent(CreateStudentRequest request){
        Student student = new Student();

        student.setStudentName(request.getStudentName());

        Course course = courseRepository.findById(request.getCourseId())
                        .orElseThrow(()->
                                new StudentNotFoundException("COURSE NOT FOUND."));

        student.setCourse(course);

        student.setAge(request.getAge());

        student.setStudentRecord(request.getStudentRecord());

        return  studentrepository.save(student);
    }

    public List<GetAllStudentResponse> findAllStudent(){

        List<Student> students = studentrepository.findAll();

        List<GetAllStudentResponse> responses = new ArrayList<>();

        for(Student student : students){

            GetAllStudentResponse response = new GetAllStudentResponse();

            response.setId(student.getId());

            response.setStudentName(student.getStudentName());

            response.setCourseId(student.getCourse().getCourseId());

            response.setAge(student.getAge());

            responses.add(response);
        }

        return responses;

    }

    public GetByIdStudentReponse getStudentById(Integer id){
        Student student =  studentrepository.findById(id)
                .orElseThrow(()->
                        new StudentNotFoundException("STUDENT DOESN'T EXISTS -WE THOUGHT 1.RECORD IS REMOVED 2.IT NOT CREATED"));

        GetByIdStudentReponse newStudent = new GetByIdStudentReponse();

        newStudent.setId(student.getId());
        newStudent.setStudentName(student.getStudentName());
        newStudent.setCourseId(student.getCourse().getCourseId());
        newStudent.setAge(student.getAge());
        newStudent.setStudentRecord(student.getStudentRecord());

        return newStudent;

    }

    public Student updateStudent(Integer id, UpdateStudentRequest newStudent){
        Student existingStudent = studentrepository.findById(id)
                .orElseThrow(()->
        new StudentNotFoundException("ID NOT FOUND"));

        Course course = courseRepository.findById(newStudent.getCourseId())
                        .orElseThrow(()->new StudentNotFoundException("THE COURSE ID NOT FOUND"));

        existingStudent.setStudentName(newStudent.getStudentName());
        existingStudent.setCourse(course);
        existingStudent.setAge(newStudent.getAge());
        existingStudent.setStudentRecord(newStudent.getStudentRecord());
        return studentrepository.save(existingStudent);
    }

    public void deleteStudent(Integer id){

        Student student = studentrepository.findById(id)
                .orElseThrow(()->
                        new StudentNotFoundException("STUDENT DOESN'T EXISTS -WE THOUGHT 1.RECORD IS REMOVED 2.IT NOT CREATED"));
        studentrepository.delete(student);
    }

    public void deleteAllStudent(){
        studentrepository.deleteAll();
    }


    public List<Student> findStudentByCourse(String courseName){
       return  studentrepository.findByCourse_CourseName(courseName);
    }

    public List<Student> findStudentByStudentName(String name){
        return studentrepository.findByStudentName(name);
    }

    public List<Student> findStudentAgeGreaterThan(Integer age){
        return studentrepository.findByAgeGreaterThan(age);
    }

    public List<Student> findStudentCourseNotIn(List<String> courseName){
        return studentrepository.findByCourse_CourseNameNotIn(courseName);
    }

    public List<Student> findStudentByAgeLessThan(Integer age){
        return studentrepository.findByAgeLessThan(age);
    }

    public List<Student> findStudentByCourseIn(List<String> courseName){
        return studentrepository.findByCourse_CourseNameIn(courseName);
    }

    public List<Student> findStudentByCourseAndAgeGreaterThan(String courseName,Integer age){
        return studentrepository.findByCourse_CourseNameAndAgeGreaterThan(courseName,age);
    }

    public List<Student> findStudentNameByContainsIgnoreCase(String studentName){
        return studentrepository.findByStudentNameContainingIgnoreCase(studentName);
    }

    public List<Student> findCourseOrderByAgeAsc(String courseName){
        return studentrepository.findByCourse_CourseNameOrderByAgeAsc(courseName);
    }

    public List<Student> findCourseOrderByAgeDesc(String courseName){
        return studentrepository.findByCourse_CourseNameOrderByAgeDesc(courseName);
    }

    public List<Student> findCourseOrderByStudentNameAsc(String courseName){
        return studentrepository.findByCourse_CourseNameOrderByStudentNameAsc(courseName);
    }

    public List<Student> findCourseOrderByStudentNameDesc(String courseName){
        return studentrepository.findByCourse_CourseNameOrderByStudentNameDesc(courseName);
    }

    public Long countCourse(String courseName){
        return studentrepository.countByCourse_CourseName(courseName);
    }

    public Boolean existsStudentNameOrNot(String studentName){
        return studentrepository.existsByStudentName(studentName);
    }

    public List<Student> getStudentByCourseByQuery(String courseName){
        return studentrepository.getStudentByCourseQuery(courseName);
    }

    public List<Student> getStudentByCourseAndAgeByQuery(String course, Integer age){
        return studentrepository.getStudentByCourseAndAgeQuery(course,age);
    }

    public List<Student> getStudentByWordByQuery(String name){
        return studentrepository.getStudentByWordQuery(name);
    }
}