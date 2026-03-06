package com.vini.school.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "classrooms")
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer year;
}