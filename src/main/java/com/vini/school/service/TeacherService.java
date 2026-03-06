package com.vini.school.service;

import com.vini.school.entity.Teacher;
import com.vini.school.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher createTeacher(Teacher teacher) {

        if (teacherRepository.findByEmail(teacher.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        return teacherRepository.save(teacher);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {

        return teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
    }

    public Teacher updateTeacher(Long id, Teacher updatedTeacher) {

        Teacher teacher = getTeacherById(id);

        teacher.setFullName(updatedTeacher.getFullName());
        teacher.setEmail(updatedTeacher.getEmail());
        teacher.setSpecialization(updatedTeacher.getSpecialization());

        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {

        Teacher teacher = getTeacherById(id);

        teacherRepository.delete(teacher);
    }
}