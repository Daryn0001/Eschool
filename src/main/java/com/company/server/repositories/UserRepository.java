package com.company.server.repositories;

import com.company.server.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
@Mapper
@Repository
public interface UserRepository {
    String SELECT_FROM_USERS_WHERE_ID = "SELECT * FROM users WHERE id = #{id}";
    String SELECT_FROM_USERS = "SELECT * FROM users";
    String SELECT_FROM_USERS_WHERE_EMAIL = "SELECT * FROM users WHERE email = #{email}";

    @Select(SELECT_FROM_USERS)
    List<User> findAll();

    @Select(SELECT_FROM_USERS_WHERE_ID)
    User findById(Long id);

    @Insert("INSERT INTO users (name, email, password, role)" +
            "VALUES (#{name}, #{email}, #{password}, #{role})")
    void insert(User user);

    @Select(SELECT_FROM_USERS_WHERE_EMAIL)
    User findByEmail(String email);
}
