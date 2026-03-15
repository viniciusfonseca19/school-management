package com.vini.school.controller;

import com.vini.school.dto.request.GradeRequestDTO;
import com.vini.school.dto.response.GradeResponseDTO;
import com.vini.school.service.GradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping
    public GradeResponseDTO create(@RequestBody GradeRequestDTO dto) {
        return gradeService.create(dto);
    }

    @GetMapping
    public List<GradeResponseDTO> getAll() {
        return gradeService.getAll();
    }

    @GetMapping("/{id}")
    public GradeResponseDTO getById(@PathVariable Long id) {
        return gradeService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        gradeService.delete(id);
    }
}