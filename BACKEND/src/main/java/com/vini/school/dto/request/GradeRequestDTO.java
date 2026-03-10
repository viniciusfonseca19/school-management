package com.vini.school.dto.request;

public class GradeRequestDTO {

    private Double value;
    private Long studentId;
    private Long classroomId;

    public Double getValue() {
        return value;
    }

    public Long getStudentId() {
        return studentId;
    }

    public Long getClassroomId() {
        return classroomId;
    }
}