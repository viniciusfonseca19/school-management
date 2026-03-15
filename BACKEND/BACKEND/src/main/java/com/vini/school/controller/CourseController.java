package com.vini.school.controller;

import com.vini.school.dto.request.CourseRequestDTO;
import com.vini.school.dto.response.CourseResponseDTO;
import com.vini.school.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public CourseResponseDTO create(@RequestBody CourseRequestDTO dto) {
        return courseService.create(dto);
    }

    @GetMapping
    public List<CourseResponseDTO> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public CourseResponseDTO getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}")
    public CourseResponseDTO updateCourse(@PathVariable Long id,
                                          @RequestBody CourseRequestDTO dto) {
        return courseService.updateCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}