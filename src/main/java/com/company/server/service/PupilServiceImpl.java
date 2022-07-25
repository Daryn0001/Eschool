package com.company.server.service;

import com.company.server.exceptions.BadRequestException;
import com.company.server.exceptions.DataNotFoundException;
import com.company.server.exceptions.DuplicateException;
import com.company.server.model.Pupil;
import com.company.server.repositories.PupilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.text.MessageFormat;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PupilServiceImpl implements PupilService {

    private final PupilRepository repository;

    @Override
    public List<Pupil> getAll() {
        return repository.findAll();
    }

    @Override
    public Pupil getOne(Long id) {
        Pupil pupil = repository.findById(id);
        if(ObjectUtils.isEmpty(pupil)){
            throw new DataNotFoundException(MessageFormat.format("Pupil id {0} not found", String.valueOf(id)));
        }
        return pupil;
    }

    @Override
    public Pupil create(Pupil pupil) {
        Pupil pupilByEmail = getByEmail(pupil.getEmail());
        if(!ObjectUtils.isEmpty(pupilByEmail)){
            throw new DuplicateException(MessageFormat.format("Pupil {0} already exists in the system", pupil.getEmail()));
        }
        repository.insert(pupil);

        return getByEmail(pupil.getEmail());
    }

    @Override
    public void delete(Long id) {
        boolean isDeleted = repository.delete(id);
        if(!isDeleted) {
            throw new BadRequestException("Delete error, please check ID and try again");
        }
    }

    @Override
    public Pupil getByEmail(String email) {
        return repository.findByEmail(email);
    }
}
