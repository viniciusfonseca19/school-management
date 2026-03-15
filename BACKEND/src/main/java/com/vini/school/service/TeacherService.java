package com.vini.school.service;

import com.vini.school.dto.request.TeacherRequestDTO;
import com.vini.school.dto.response.TeacherResponseDTO;
import com.vini.school.entity.Teacher;
import com.vini.school.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public TeacherResponseDTO create(TeacherRequestDTO dto) {

        if (teacherRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        Teacher teacher = new Teacher();
        teacher.setFullName(dto.getFullName());
        teacher.setEmail(dto.getEmail());
        teacher.setSpecialization(dto.getSpecialization());

        Teacher savedTeacher = teacherRepository.save(teacher);

        return convertToResponse(savedTeacher);
    }

    public List<TeacherResponseDTO> getAllTeachers() {

        return teacherRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public TeacherResponseDTO getTeacherById(Long id) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        return convertToResponse(teacher);
    }

    public TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO dto) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        teacher.setFullName(dto.getFullName());
        teacher.setEmail(dto.getEmail());
        teacher.setSpecialization(dto.getSpecialization());

        Teacher updatedTeacher = teacherRepository.save(teacher);

        return convertToResponse(updatedTeacher);
    }

    public void deleteTeacher(Long id) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        teacherRepository.delete(teacher);
    }

    private TeacherResponseDTO convertToResponse(Teacher teacher) {

        return new TeacherResponseDTO(
                teacher.getId(),
                teacher.getFullName(),
                teacher.getEmail(),
                teacher.getSpecialization()
        );
    }
}