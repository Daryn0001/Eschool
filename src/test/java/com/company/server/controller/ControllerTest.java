package com.company.server.controller;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.client.RestTemplate;
import org.testng.Assert;
import org.testng.annotations.Test;


@SpringBootTest
public class ControllerTest {


  @Test
    void login_shouldReturn_Http_OK_Status_WhenLoginAndPassIsCorrect() {
      String addURI = "http://localhost:8080/api/auth/login";
      HttpHeaders headers = new HttpHeaders();
      headers.add("Accept", "application/json");
      headers.add("Content-Type", "application/json");
      String jsonBody = "{\"email\":\"daryn@example.com\",\"password\":\"admin\"}";

      HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<String> response =restTemplate.postForEntity(addURI, entity, String.class);
      System.out.println("response.getBody():" + response.getBody());
      Assert.assertEquals(response.getStatusCode(), HttpStatus.OK);

  }

  @Test
    void login_shouldReturnAccessToken_WhenLoginAndPassIsCorrect() {
      String addURI = "http://localhost:8080/api/auth/login";
      HttpHeaders headers = new HttpHeaders();
      headers.add("Accept", "application/json");
      headers.add("Content-Type", "application/json");
      String jsonBody = "{\"email\":\"daryn@example.com\",\"password\":\"admin\"}";

      HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<String> response =restTemplate.postForEntity(addURI, entity, String.class);
      String responseBody = response.getBody();
      Assert.assertTrue(responseBody.contains("accessToken"));
  }


    @Test
    void login_shouldReturnRefreshToken_WhenLoginAndPassIsCorrect() {
        String addURI = "http://localhost:8080/api/auth/login";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept", "application/json");
        headers.add("Content-Type", "application/json");
        String jsonBody = "{\"email\":\"daryn@example.com\",\"password\":\"admin\"}";

        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response =restTemplate.postForEntity(addURI, entity, String.class);
        String responseBody = response.getBody();
        Assert.assertTrue(responseBody.contains("refreshToken"));
    }

}
