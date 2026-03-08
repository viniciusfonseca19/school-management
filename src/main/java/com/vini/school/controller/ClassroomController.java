package com.vini.school.controller;

import com.vini.school.dto.request.ClassroomRequestDTO;
import com.vini.school.dto.response.ClassroomResponseDTO;
import com.vini.school.service.ClassroomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping
    public ClassroomResponseDTO create(@RequestBody ClassroomRequestDTO dto) {
        return classroomService.create(dto);
    }

    @GetMapping
    public List<ClassroomResponseDTO> getAll() {
        return classroomService.getAllClassrooms();
    }

    @GetMapping("/{id}")
    public ClassroomResponseDTO getById(@PathVariable Long id) {
        return classroomService.getClassroomById(id);
    }

    @PutMapping("/{id}")
    public ClassroomResponseDTO update(@PathVariable Long id,
                                       @RequestBody ClassroomRequestDTO dto) {
        return classroomService.updateClassroom(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        classroomService.deleteClassroom(id);
    }
}