package com.vini.school.dto.request;

public class ClassroomRequestDTO {

    private String name;
    private Long courseId;
    private Long teacherId;

    public String getName() {
        return name;
    }

    public Long getCourseId() {
        return courseId;
    }

    public Long getTeacherId() {
        return teacherId;
    }
}