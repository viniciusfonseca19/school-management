package com.vini.school.dto.response;

public class GradeResponseDTO {

    private Long id;
    private Double value;
    private String studentName;
    private String classroomName;

    public GradeResponseDTO(Long id, Double value,
                            String studentName,
                            String classroomName) {
        this.id = id;
        this.value = value;
        this.studentName = studentName;
        this.classroomName = classroomName;
    }

    public Long getId() {
        return id;
    }

    public Double getValue() {
        return value;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getClassroomName() {
        return classroomName;
    }
}