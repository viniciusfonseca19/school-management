package com.vini.school.controller;

import com.vini.school.dto.request.UserRequestDTO;
import com.vini.school.dto.response.UserResponseDTO;
import com.vini.school.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponseDTO create(@RequestBody UserRequestDTO dto) {
        return userService.create(dto);
    }

    @GetMapping
    public List<UserResponseDTO> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}