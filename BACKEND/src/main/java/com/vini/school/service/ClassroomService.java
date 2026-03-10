package com.vini.school.service;

import com.vini.school.dto.request.ClassroomRequestDTO;
import com.vini.school.dto.response.ClassroomResponseDTO;
import com.vini.school.entity.Classroom;
import com.vini.school.entity.Course;
import com.vini.school.entity.Teacher;
import com.vini.school.repository.ClassroomRepository;
import com.vini.school.repository.CourseRepository;
import com.vini.school.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;

    public ClassroomService(ClassroomRepository classroomRepository,
                            CourseRepository courseRepository,
                            TeacherRepository teacherRepository) {
        this.classroomRepository = classroomRepository;
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
    }

    public ClassroomResponseDTO create(ClassroomRequestDTO dto) {

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Teacher teacher = teacherRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Classroom classroom = new Classroom();
        classroom.setName(dto.getName());
        classroom.setCourse(course);
        classroom.setTeacher(teacher);

        Classroom saved = classroomRepository.save(classroom);

        return convertToResponse(saved);
    }

    public List<ClassroomResponseDTO> getAllClassrooms() {

        return classroomRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ClassroomResponseDTO getClassroomById(Long id) {

        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        return convertToResponse(classroom);
    }

    public ClassroomResponseDTO updateClassroom(Long id, ClassroomRequestDTO dto) {

        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Teacher teacher = teacherRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        classroom.setName(dto.getName());
        classroom.setCourse(course);
        classroom.setTeacher(teacher);

        Classroom updated = classroomRepository.save(classroom);

        return convertToResponse(updated);
    }

    public void deleteClassroom(Long id) {

        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        classroomRepository.delete(classroom);
    }

    private ClassroomResponseDTO convertToResponse(Classroom classroom) {

        return new ClassroomResponseDTO(
                classroom.getId(),
                classroom.getName(),
                classroom.getCourse().getName(),
                classroom.getTeacher().getFullName()
        );
    }
}