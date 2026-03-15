package com.vini.school.dto.response;

import java.time.LocalDate;

public class EnrollmentResponseDTO {

    private Long id;
    private String studentName;
    private String classroomName;
    private LocalDate enrollmentDate;

    public EnrollmentResponseDTO(Long id, String studentName,
                                 String classroomName,
                                 LocalDate enrollmentDate) {
        this.id = id;
        this.studentName = studentName;
        this.classroomName = classroomName;
        this.enrollmentDate = enrollmentDate;
    }

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }
}