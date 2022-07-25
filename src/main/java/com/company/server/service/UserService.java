package com.company.server.service;

import com.company.server.model.User;

import java.util.List;

public interface UserService {
    List<User> getAll();

    User getOne(Long id);

    User create(User user);

    User getByEmail(String email);

}
