package com.company.server.repositories;

import com.company.server.model.Pupil;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PupilRepository {
    String SELECT_FROM_PUPILS_WHERE_ID = "SELECT * FROM pupils WHERE id = #{id}";
    String SELECT_FROM_PUPILS = "SELECT * FROM pupils";

    @Select(SELECT_FROM_PUPILS)
    List<Pupil> findAll();

    @Select(SELECT_FROM_PUPILS_WHERE_ID)
    Pupil findById(Long id);

    @Insert("INSERT INTO pupils (name, email, phone) " +
            "VALUES (#{name}, #{email}, #{phone})")
    void insert(Pupil pupil);

    @Delete("DELETE FROM pupils WHERE id = #{id}")
    boolean delete(Long id);

    @Select("SELECT * FROM pupils WHERE email = #{email}")
    Pupil findByEmail(String email);
}
