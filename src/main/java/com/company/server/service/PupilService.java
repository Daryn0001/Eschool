package com.company.server.service;

import com.company.server.model.Pupil;

import java.util.List;

public interface PupilService {
    List<Pupil> getAll();

    Pupil getOne(Long id);

    Pupil create(Pupil pupil);

    void delete(Long id);

    Pupil getByEmail(String email);
}
