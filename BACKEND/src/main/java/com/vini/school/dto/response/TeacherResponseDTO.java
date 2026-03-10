package com.vini.school.dto.response;

public class TeacherResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String specialization;

    public TeacherResponseDTO(Long id, String fullName, String email, String specialization) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.specialization = specialization;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getSpecialization() {
        return specialization;
    }
}