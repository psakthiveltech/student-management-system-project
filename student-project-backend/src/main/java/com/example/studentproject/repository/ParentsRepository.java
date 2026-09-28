package com.example.studentproject.repository;

import com.example.studentproject.student.ParentsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentsRepository extends JpaRepository<ParentsDetails,Integer> {
}
