package com.vini.school.service;

import com.vini.school.dto.request.StudentRequestDTO;
import com.vini.school.dto.response.StudentResponseDTO;
import com.vini.school.entity.Student;
import com.vini.school.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentResponseDTO create(StudentRequestDTO dto) {

        if (studentRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        if (studentRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new RuntimeException("Registration number already exists");
        }

        Student student = new Student();
        student.setFullName(dto.getFullName());
        student.setEmail(dto.getEmail());
        student.setBirthDate(dto.getBirthDate());
        student.setRegistrationNumber(dto.getRegistrationNumber());

        Student savedStudent = studentRepository.save(student);

        return convertToResponse(savedStudent);
    }

    public List<StudentResponseDTO> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public StudentResponseDTO getStudentById(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return convertToResponse(student);
    }

    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO dto) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setFullName(dto.getFullName());
        student.setEmail(dto.getEmail());
        student.setBirthDate(dto.getBirthDate());
        student.setRegistrationNumber(dto.getRegistrationNumber());

        Student updatedStudent = studentRepository.save(student);

        return convertToResponse(updatedStudent);
    }

    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRepository.delete(student);
    }

    private StudentResponseDTO convertToResponse(Student student) {

        return new StudentResponseDTO(
                student.getId(),
                student.getFullName(),
                student.getEmail(),
                student.getRegistrationNumber(),
                student.getBirthDate()
        );
    }
}