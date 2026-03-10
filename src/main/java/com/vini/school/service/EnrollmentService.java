package com.vini.school.service;

import com.vini.school.dto.request.EnrollmentRequestDTO;
import com.vini.school.dto.response.EnrollmentResponseDTO;
import com.vini.school.entity.Classroom;
import com.vini.school.entity.Enrollment;
import com.vini.school.entity.Student;
import com.vini.school.repository.ClassroomRepository;
import com.vini.school.repository.EnrollmentRepository;
import com.vini.school.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final ClassroomRepository classroomRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             StudentRepository studentRepository,
                             ClassroomRepository classroomRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.classroomRepository = classroomRepository;
    }

    public EnrollmentResponseDTO create(EnrollmentRequestDTO dto) {

        if (enrollmentRepository
                .findByStudentIdAndClassroomId(dto.getStudentId(), dto.getClassroomId())
                .isPresent()) {

            throw new RuntimeException("Student already enrolled in this classroom");
        }

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Classroom classroom = classroomRepository.findById(dto.getClassroomId())
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setClassroom(classroom);
        enrollment.setEnrollmentDate(LocalDate.now());

        Enrollment saved = enrollmentRepository.save(enrollment);

        return convertToResponse(saved);
    }

    public List<EnrollmentResponseDTO> getAll() {

        return enrollmentRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public EnrollmentResponseDTO getById(Long id) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        return convertToResponse(enrollment);
    }

    public void delete(Long id) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollmentRepository.delete(enrollment);
    }

    private EnrollmentResponseDTO convertToResponse(Enrollment enrollment) {

        return new EnrollmentResponseDTO(
                enrollment.getId(),
                enrollment.getStudent().getFullName(),
                enrollment.getClassroom().getName(),
                enrollment.getEnrollmentDate()
        );
    }
}