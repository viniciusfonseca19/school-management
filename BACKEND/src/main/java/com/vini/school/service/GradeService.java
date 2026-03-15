package com.vini.school.service;

import com.vini.school.dto.request.GradeRequestDTO;
import com.vini.school.dto.response.GradeResponseDTO;
import com.vini.school.entity.Classroom;
import com.vini.school.entity.Grade;
import com.vini.school.entity.Student;
import com.vini.school.repository.ClassroomRepository;
import com.vini.school.repository.GradeRepository;
import com.vini.school.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GradeService {

    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;
    private final ClassroomRepository classroomRepository;

    public GradeService(GradeRepository gradeRepository,
                        StudentRepository studentRepository,
                        ClassroomRepository classroomRepository) {
        this.gradeRepository = gradeRepository;
        this.studentRepository = studentRepository;
        this.classroomRepository = classroomRepository;
    }

    public GradeResponseDTO create(GradeRequestDTO dto) {

        if (dto.getValue() < 0 || dto.getValue() > 10) {
            throw new RuntimeException("Grade must be between 0 and 10");
        }

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Classroom classroom = classroomRepository.findById(dto.getClassroomId())
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        Grade grade = new Grade();
        grade.setValue(dto.getValue());
        grade.setStudent(student);
        grade.setClassroom(classroom);

        Grade saved = gradeRepository.save(grade);

        return convertToResponse(saved);
    }

    public List<GradeResponseDTO> getAll() {

        return gradeRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public GradeResponseDTO getById(Long id) {

        Grade grade = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        return convertToResponse(grade);
    }

    public void delete(Long id) {

        Grade grade = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        gradeRepository.delete(grade);
    }

    private GradeResponseDTO convertToResponse(Grade grade) {

        return new GradeResponseDTO(
                grade.getId(),
                grade.getValue(),
                grade.getStudent().getFullName(),
                grade.getClassroom().getName()
        );
    }
}