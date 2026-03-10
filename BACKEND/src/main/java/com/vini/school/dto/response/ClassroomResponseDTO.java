package com.vini.school.dto.response;

public class ClassroomResponseDTO {

    private Long id;
    private String name;
    private String courseName;
    private String teacherName;

    public ClassroomResponseDTO(Long id, String name, String courseName, String teacherName) {
        this.id = id;
        this.name = name;
        this.courseName = courseName;
        this.teacherName = teacherName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getTeacherName() {
        return teacherName;
    }
}