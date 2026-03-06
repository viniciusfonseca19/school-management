package com.vini.school.service;

import com.vini.school.entity.Grade;
import com.vini.school.repository.GradeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {

    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Grade createGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(Long id) {

        return gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grade not found"));
    }

    public void deleteGrade(Long id) {

        Grade grade = getGradeById(id);

        gradeRepository.delete(grade);
    }
}