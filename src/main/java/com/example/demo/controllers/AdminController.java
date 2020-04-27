package com.example.demo.controllers;

import com.example.demo.models.Doctor;
import com.example.demo.models.Patient;
import com.example.demo.utils.DataBase;
import com.google.gson.JsonObject;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

//@CrossOrigin(origins = "http://localhost:4200")

@CrossOrigin(origins = "http://192.168.56.1:8080")

@RestController
@RequestMapping("/api/v1")
public class AdminController {
  @Autowired
  HikariDataSource hds;

  @PostMapping("/doctors")  
  @ResponseBody
  public String addDoctor(@RequestBody Doctor doctor) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      String firstName = doctor.getFirst_name();
      String lastName = doctor.getLast_name();
      String passportNumber = doctor.getPassport_number();
      String profession = doctor.getProfession();
      String address = doctor.getAddress();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL DOCTOR_PKG.DOCTOR_ADD_P(?, ?, ?, ?, ?)}");
      cs.setString(1, firstName);
      cs.setString(2, lastName);
      cs.setString(3, passportNumber);
      cs.setString(4, profession);
      cs.setString(5, address);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @PostMapping("/patients")
  @ResponseBody
  public String addPatient(@RequestBody Patient patient) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      String firstName = patient.getFirst_name();
      String lastName = patient.getLast_name();
      String fatherName = patient.getFather_name();
      String address = patient.getAddress();
      String birthDate = patient.getBirth_date();
      String phoneNumber = patient.getPhone_number();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL SPRING.PATIENT_ADD_P(?, ?, ?, ?, ?, ?)}");
      cs.setString(1, firstName);
      cs.setString(2, lastName);
      cs.setString(3, fatherName);
      cs.setString(4, address);
      cs.setString(5, birthDate);
      cs.setString(6, phoneNumber);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @GetMapping("/doctors")
  public ArrayList readDoctors() {
    ArrayList<Doctor> doctors = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM SPRING.DOCTOR");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        Doctor d = new Doctor();
        d.setDoctor_id(rs.getInt("doctor_id"));
        d.setFirst_name(rs.getString("first_name"));
        d.setLast_name(rs.getString("last_name"));
        d.setPassport_number(rs.getString("passport_number"));
        d.setProfession(rs.getString("profession"));
        d.setAddress(rs.getString("address"));
        doctors.add(d);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return doctors;
  }

  @GetMapping("/patients")
  public ArrayList readPatients() {
    ArrayList<Patient> patients = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM SPRING.PATIENT");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        Patient p = new Patient();
        p.setPatient_id(rs.getInt("patient_id"));
        p.setFirst_name(rs.getString("first_name"));
        p.setLast_name(rs.getString("last_name"));
        p.setFather_name(rs.getString("father_name"));
        p.setAddress(rs.getString("address"));
        p.setBirth_date(rs.getString("birth_date"));
        p.setPhone_number(rs.getString("phone_number"));
        patients.add(p);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return patients;
  }

//  @GetMapping("/doctors/{doctorId}")
//  public ArrayList<Doctor> readDoctor(@PathVariable int doctorId) {
//    ArrayList<Doctor> doctors = new ArrayList<>();
//    Connection conn = null;
//    PreparedStatement ps = null;
//    ResultSet rs = null;
//    try {
//      conn = hds.getConnection();
//      ps = conn.prepareStatement("SELECT * FROM SPRING.DOCTOR WHERE DOCTOR_ID = ?");
//      ps.setInt(1, doctorId);
//      ps.execute();
//      rs = ps.getResultSet();
//      while (rs.next()) {
//        Doctor d = new Doctor();
//        d.setDoctor_id(rs.getInt("doctor_id"));
//        d.setFirst_name(rs.getString("first_name"));
//        d.setLast_name(rs.getString("last_name"));
//        d.setPassport_number(rs.getString("passport_number"));
//        d.setProfession(rs.getString("profession"));
//        d.setAddress(rs.getString("address"));
//        doctors.add(d);
//      }
//    } catch (Exception e) {
//      e.printStackTrace();
//    } finally {
//      DataBase.close(rs);
//      DataBase.close(ps);
//      DataBase.close(conn);
//    }
//    return doctors;
//  }

  @PutMapping("/doctors/{doctor_id}")
  @ResponseBody
  public String updateDoctor(@RequestBody Doctor doctor, @PathVariable int doctor_id) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      String first_name = doctor.getFirst_name();
      String last_name = doctor.getLast_name();
      String passport_number = doctor.getPassport_number();
      String profession = doctor.getProfession();
      String address = doctor.getAddress();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL DOCTOR_PKG.DOCTOR_UPDATE_P(?, ?, ?, ?, ?, ?)}");
      cs.setInt(1, doctor_id);
      cs.setString(2, first_name);
      cs.setString(3, last_name);
      cs.setString(4, passport_number);
      cs.setString(5, profession);
      cs.setString(6, address);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @PutMapping("/patients/{patient_id}")
  @ResponseBody
  public String updatePatient(@RequestBody Patient patient, @PathVariable int patient_id) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      String first_name = patient.getFirst_name();
      String last_name = patient.getLast_name();
      String father_name = patient.getFather_name();
      String address = patient.getAddress();
      String birth_date = patient.getBirth_date();
      String phone_number = patient.getPhone_number();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL SPRING.PATIENT_UPDATE_P(?, ?, ?, ?, ?, ?, ?)}");
      cs.setInt(1, patient_id);
      cs.setString(2, first_name);
      cs.setString(3, last_name);
      cs.setString(4, father_name);
      cs.setString(5, address);
      cs.setString(6, birth_date);
      cs.setString(7, phone_number);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @DeleteMapping("/doctors/{doctor_id}")
  public void deleteDoctor(@PathVariable int doctor_id) {
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL DOCTOR_PKG.DOCTOR_DELETE_P(?)}");
      cs.setInt(1, doctor_id);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
  }

  @DeleteMapping("/patients/{patient_id}")
  public void deletePatient(@PathVariable int patient_id) {
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL SPRING.PATIENT_DELETE_P(?)}");
      cs.setInt(1, patient_id);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
  }
}

