package com.vini.school.service;

import com.vini.school.dto.request.CourseRequestDTO;
import com.vini.school.dto.response.CourseResponseDTO;
import com.vini.school.entity.Course;
import com.vini.school.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseResponseDTO create(CourseRequestDTO dto) {

        Course course = new Course();
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());

        Course savedCourse = courseRepository.save(course);

        return convertToResponse(savedCourse);
    }

    public List<CourseResponseDTO> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public CourseResponseDTO getCourseById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return convertToResponse(course);
    }

    public CourseResponseDTO updateCourse(Long id, CourseRequestDTO dto) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setName(dto.getName());
        course.setDescription(dto.getDescription());

        Course updatedCourse = courseRepository.save(course);

        return convertToResponse(updatedCourse);
    }

    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        courseRepository.delete(course);
    }

    private CourseResponseDTO convertToResponse(Course course) {

        return new CourseResponseDTO(
                course.getId(),
                course.getName(),
                course.getDescription()
        );
    }
}