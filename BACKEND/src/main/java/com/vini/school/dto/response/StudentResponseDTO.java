package com.vini.school.dto.response;

import java.time.LocalDate;

public class StudentResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String registrationNumber;
    private LocalDate birthDate;

    public StudentResponseDTO(Long id, String fullName, String email,
                              String registrationNumber, LocalDate birthDate) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.birthDate = birthDate;
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

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }
}