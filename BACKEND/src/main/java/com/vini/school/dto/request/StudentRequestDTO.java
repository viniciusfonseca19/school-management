package com.vini.school.dto.request;

import java.time.LocalDate;

public class StudentRequestDTO {

    private String fullName;
    private String email;
    private String registrationNumber;
    private LocalDate birthDate;

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