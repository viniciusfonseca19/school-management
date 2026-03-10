package com.vini.school.controller;

import com.vini.school.dto.request.EnrollmentRequestDTO;
import com.vini.school.dto.response.EnrollmentResponseDTO;
import com.vini.school.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public EnrollmentResponseDTO create(@RequestBody EnrollmentRequestDTO dto) {
        return enrollmentService.create(dto);
    }

    @GetMapping
    public List<EnrollmentResponseDTO> getAll() {
        return enrollmentService.getAll();
    }

    @GetMapping("/{id}")
    public EnrollmentResponseDTO getById(@PathVariable Long id) {
        return enrollmentService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        enrollmentService.delete(id);
    }
}