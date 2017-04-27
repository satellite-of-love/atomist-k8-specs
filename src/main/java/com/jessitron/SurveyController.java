package com.jessitron;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SurveyController {

    @CrossOrigin()
    @RequestMapping(path = "/survey")
    public Survey survey(@RequestParam(value = "seed") Int seed) {
        return new Survey(seed);
    }
}
