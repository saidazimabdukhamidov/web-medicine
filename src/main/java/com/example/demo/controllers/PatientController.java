package com.example.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "http://192.168.56.1:8080")

@RestController
@RequestMapping("/api/v1")
public class PatientController {
}

