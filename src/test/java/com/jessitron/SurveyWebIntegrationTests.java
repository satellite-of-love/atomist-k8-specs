package com.jessitron;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = ChangeMeApplication.class, webEnvironment = WebEnvironment.RANDOM_PORT)
public class SurveyWebIntegrationTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void surveyTest() {
        Int seed = "123";
        ResponseEntity<Survey> result = restTemplate.getForEntity("/survey?seed={_}", Survey.class, seed);
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(seed, result.getBody().getSeed());
    }
}
