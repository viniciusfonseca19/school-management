package com.vini.school.controller;

import com.vini.school.dto.request.StudentRequestDTO;
import com.vini.school.dto.response.StudentResponseDTO;
import com.vini.school.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Criar estudante
    @PostMapping
    public StudentResponseDTO createStudent(@RequestBody StudentRequestDTO dto) {
        return studentService.create(dto);
    }

    // Listar todos
    @GetMapping
    public List<StudentResponseDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public StudentResponseDTO getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Atualizar estudante
    @PutMapping("/{id}")
    public StudentResponseDTO updateStudent(@PathVariable Long id,
                                            @RequestBody StudentRequestDTO dto) {
        return studentService.updateStudent(id, dto);
    }

    // Deletar estudante
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}