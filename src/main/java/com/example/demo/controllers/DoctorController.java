package com.example.demo.controllers;

import com.example.demo.models.MedicalHistory;
import com.example.demo.services.DoctorService;
import com.example.demo.utils.DataBase;
import com.google.gson.JsonObject;
import com.zaxxer.hikari.HikariDataSource;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200")

//@CrossOrigin(origins = "http://192.168.56.1:8080")

@RestController
@RequestMapping("/api/v1")
public class DoctorController {

  @Autowired HikariDataSource hds;
  @Autowired DoctorService sDoctor;

  @PostMapping("/histories")
  public String addMedHistory(@RequestBody String parameters) {
    JSONObject data = new JSONObject(parameters);
    return sDoctor.addMedHistory(data);
  }

  @GetMapping("/patients/{patient_id}")
  public String readPatient(@PathVariable int patient_id) {
    return sDoctor.readPatient(patient_id);
  }

  @GetMapping("/histories")
  public String readMedHistory() {
    return sDoctor.readHistories();
  }
}
