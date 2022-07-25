package com.company.server.controller;

import com.company.server.exceptions.BadRequestException;
import com.company.server.model.JwtAuthentication;
import com.company.server.model.Pupil;
import com.company.server.security.services.AuthService;
import com.company.server.service.PupilService;
import com.company.server.web.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.util.ObjectUtils;

import java.text.MessageFormat;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pupil")
public class Controller {
    private final PupilService pupilService;
    private final AuthService authService;


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<String> helloAdmin() {
        final JwtAuthentication authInfo = authService.getAuthInfo();
        return ResponseEntity.ok("Hello admin " + authInfo.getPrincipal() + "!");
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user")
    public ResponseEntity<String> helloUser() {
        final JwtAuthentication authInfo = authService.getAuthInfo();
        return ResponseEntity.ok("Hello user " + authInfo.getPrincipal() + "!");
    }




    @PostMapping(value="/add")
    public ResponseEntity<SuccessResponse> insert(@RequestBody Pupil pupil){
        if (!ObjectUtils.isEmpty(pupil.getId())) {
            throw new BadRequestException("A new data cannot already have an ID");
        }
        return new ResponseEntity<>(
                new SuccessResponse(pupilService.create(pupil), "Successful registration"),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<SuccessResponse> getAll() {
        List<Pupil> pupil = pupilService.getAll();

        return new ResponseEntity<>(new SuccessResponse(pupil, MessageFormat.format("{0}, Result found", pupil.size())), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse> getOne(@PathVariable("id") Long id){
        Pupil pupil = pupilService.getOne(id);
        return new ResponseEntity<>(
                new SuccessResponse(pupil, "Result found"), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable("id") Long id){
        pupilService.delete(id);
        return new ResponseEntity<>(
                new SuccessResponse(null, "Delete completed successfully"), HttpStatus.OK);
    }

}
