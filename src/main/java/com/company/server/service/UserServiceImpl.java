package com.company.server.service;

import com.company.server.exceptions.DataNotFoundException;
import com.company.server.exceptions.DuplicateException;
import com.company.server.model.User;
import com.company.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.text.MessageFormat;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository repository;

    @Override
    public List<User> getAll() {
        return repository.findAll();
    }

    @Override
    public User getOne(Long id) {
        User user = repository.findById(id);

        if(ObjectUtils.isEmpty(user)){
            throw new DataNotFoundException(MessageFormat.format("User id {0} not found", String.valueOf(id)));
        }
        return user;
    }

    @Override
    public User create(User user) {
        User userByEmail = getByEmail(user.getEmail());
        if(!ObjectUtils.isEmpty(userByEmail)){
            throw new DuplicateException(MessageFormat.format("Pupil {0} already exists in the system", user.getEmail()));
        }

        repository.insert(user);

        return getByEmail(user.getEmail());
    }

    @Override
    public User getByEmail(String email) {
        return repository.findByEmail(email);
    }
}
