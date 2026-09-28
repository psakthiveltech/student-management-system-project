package com.example.studentproject.service;


import com.example.studentproject.dto.StudentDto.CreateStudentRequest;
import com.example.studentproject.dto.StudentDto.GetAllStudentResponse;
import com.example.studentproject.dto.StudentDto.GetByIdStudentReponse;
import com.example.studentproject.dto.StudentDto.UpdateStudentRequest;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.CourseRepository;
import com.example.studentproject.repository.ParentsRepository;
import com.example.studentproject.repository.StudentRepository;
import com.example.studentproject.student.Course;
import com.example.studentproject.student.ParentsDetails;
import com.example.studentproject.student.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentrepository;
    private final CourseRepository courseRepository;
    private final ParentsRepository parentsRepository;

    public StudentService (StudentRepository studentrepository, CourseRepository courseRepository, ParentsRepository parentsRepository){
        this.studentrepository = studentrepository;
        this.courseRepository = courseRepository;
        this.parentsRepository = parentsRepository;
    }

    public Student createStudent(CreateStudentRequest request){
        Student student = new Student();

        student.setStudentName(request.getStudentName());

        Course course = courseRepository.findById(request.getCourseId())
                        .orElseThrow(()->
                                new StudentNotFoundException("COURSE NOT FOUND."));

        ParentsDetails parentsDetails = parentsRepository.findById(request.getParentId())
                        .orElseThrow(()->new StudentNotFoundException("PARENTS DETAILS NOT FOUND MUST ENTER IT"));

        student.setCourse(course);

        student.setParentsDetails(parentsDetails);

        student.setDateOfBirth(request.getDateOfBirth());

        student.setEmail(request.getEmail());

        student.setBloodGroup(request.getBloodGroup());

        student.setGender(request.getGender());

        student.setPhoneNumber(request.getPhoneNumber());

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

            response.setParentId(student.getParentsDetails() !=null ? student.getParentsDetails().getParentId() : null);

            response.setDateOfBirth(student.getDateOfBirth());

            response.setBloodGroup(student.getBloodGroup());

            response.setGender(student.getGender());

            response.setPhoneNumber(student.getPhoneNumber());

            response.setEmail(student.getEmail());

            response.setCourseId(student.getCourse() !=null ? student.getCourse().getCourseId() : null);

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
        newStudent.setCourseId(student.getCourse() != null? student.getCourse().getCourseId():null);
        newStudent.setParentId(student.getParentsDetails() !=null ? student.getParentsDetails().getParentId():null);
        newStudent.setDateOfBirth(student.getDateOfBirth());
        newStudent.setBloodGroup(student.getBloodGroup());
        newStudent.setGender(student.getGender());
        newStudent.setPhoneNumber(student.getPhoneNumber());
        newStudent.setEmail(student.getEmail());
        newStudent.setStudentRecord(student.getStudentRecord());

        return newStudent;

    }

    public Student updateStudent(Integer id, UpdateStudentRequest newStudent){
        Student existingStudent = studentrepository.findById(id)
                .orElseThrow(()->
        new StudentNotFoundException("ID NOT FOUND"));

        Course course = courseRepository.findById(newStudent.getCourseId())
                        .orElseThrow(()->new StudentNotFoundException("THE COURSE ID NOT FOUND"));

        ParentsDetails parents = parentsRepository.findById(newStudent.getParentId())
                        .orElseThrow(()->new StudentNotFoundException("PARENTS DETAILS NOT FOUND . ADD IT"));

        existingStudent.setStudentName(newStudent.getStudentName());
        existingStudent.setCourse(course);
        existingStudent.setParentsDetails(parents);
        existingStudent.setDateOfBirth(newStudent.getDateOfBirth());
        existingStudent.setBloodGroup(newStudent.getBloodGroup());
        existingStudent.setGender(newStudent.getGender());
        existingStudent.setPhoneNumber(newStudent.getPhoneNumber());
        existingStudent.setEmail(newStudent.getEmail());
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


    public List<Student> findStudentCourseNotIn(List<String> courseName){
        return studentrepository.findByCourse_CourseNameNotIn(courseName);
    }

    public List<Student> findStudentByCourseIn(List<String> courseName){
        return studentrepository.findByCourse_CourseNameIn(courseName);
    }

    public List<Student> findStudentNameByContainsIgnoreCase(String studentName){
        return studentrepository.findByStudentNameContainingIgnoreCase(studentName);
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

    public List<Student> getStudentByWordByQuery(String name){
        return studentrepository.getStudentByWordQuery(name);
    }
}