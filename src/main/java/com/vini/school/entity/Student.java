package com.vini.school.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String registrationNumber;

    private LocalDate birthDate;

    // Construtores
    public Student() {}

    public Student(String fullName, String email, String registrationNumber, LocalDate birthDate) {
        this.fullName = fullName;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.birthDate = birthDate;
    }

    // Getters e Setters
}