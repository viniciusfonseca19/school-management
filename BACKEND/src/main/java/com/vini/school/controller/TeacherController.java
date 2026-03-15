package com.vini.school.controller;

import com.vini.school.dto.request.TeacherRequestDTO;
import com.vini.school.dto.response.TeacherResponseDTO;
import com.vini.school.service.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    public TeacherResponseDTO create(@RequestBody TeacherRequestDTO dto) {
        return teacherService.create(dto);
    }

    @GetMapping
    public List<TeacherResponseDTO> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public TeacherResponseDTO getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @PutMapping("/{id}")
    public TeacherResponseDTO updateTeacher(@PathVariable Long id,
                                            @RequestBody TeacherRequestDTO dto) {
        return teacherService.updateTeacher(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
    }
}