package com.example.demo.controllers;

import com.example.demo.services.AdminService;
import com.zaxxer.hikari.HikariDataSource;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")

//@CrossOrigin(origins = "http://192.168.56.1:8080")

@RestController
@RequestMapping("/api/v1")
public class AdminController {

  @Autowired HikariDataSource hds;
  @Autowired AdminService sAdmin;

  @GetMapping("/doctors")
  public String readDoctors() {
    return sAdmin.readDoctors();
  }

  @PostMapping("/doctors")
  @ResponseBody
  public String addDoctor(@RequestBody String parameters) {
    JSONObject data = new JSONObject(parameters);
    return sAdmin.addDoctor(data);
  }

  @PostMapping("/patients")
  @ResponseBody
  public String addPatient(@RequestBody String parameters) {
    JSONObject data = new JSONObject(parameters);
    return sAdmin.addPatient(data);
  }

  @GetMapping("/patients")
  public String readPatients() {
    return sAdmin.readPatients();
  }

  @PutMapping("/doctors/{doctor_id}")
  @ResponseBody
  public String updateDoctor(@RequestBody String parameters, @PathVariable int doctor_id) {
    JSONObject data = new JSONObject(parameters);
    return sAdmin.updateDoctor(data, doctor_id);
  }

  @PutMapping("/patients/{patient_id}")
  @ResponseBody
  public String updatePatient(@RequestBody String parameters, @PathVariable int patient_id) {
    JSONObject data = new JSONObject(parameters);
    return sAdmin.updatePatient(data, patient_id);
  }

  @DeleteMapping("/doctors/{doctor_id}")
  public String deleteDoctor(@PathVariable int doctor_id) {
    return sAdmin.deleteDoctor(doctor_id);
  }

  @DeleteMapping("/patients/{patient_id}")
  public String deletePatient(@PathVariable int patient_id) {
    return sAdmin.deletePatient(patient_id);
  }
}

