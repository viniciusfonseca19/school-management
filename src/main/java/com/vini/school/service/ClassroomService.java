package com.vini.school.service;

import com.vini.school.entity.Classroom;
import com.vini.school.repository.ClassroomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomService(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    public Classroom createClassroom(Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    public Classroom getClassroomById(Long id) {

        return classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));
    }

    public Classroom updateClassroom(Long id, Classroom updatedClassroom) {

        Classroom classroom = getClassroomById(id);

        classroom.setName(updatedClassroom.getName());
        classroom.setYear(updatedClassroom.getYear());

        return classroomRepository.save(classroom);
    }

    public void deleteClassroom(Long id) {

        Classroom classroom = getClassroomById(id);

        classroomRepository.delete(classroom);
    }
}