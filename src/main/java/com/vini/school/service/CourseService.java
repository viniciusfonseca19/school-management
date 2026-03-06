package com.vini.school.service;

import com.vini.school.entity.Course;
import com.vini.school.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public Course updateCourse(Long id, Course updatedCourse) {

        Course course = getCourseById(id);

        course.setName(updatedCourse.getName());
        course.setWorkload(updatedCourse.getWorkload());
        course.setTeacher(updatedCourse.getTeacher());

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {

        Course course = getCourseById(id);

        courseRepository.delete(course);
    }
}