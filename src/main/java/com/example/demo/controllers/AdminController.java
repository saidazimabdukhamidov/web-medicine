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

@RestController
@CrossOrigin(origins = "http://localhost:4200")

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
      cs = conn.prepareCall("{CALL SPRING.DOCTOR_INSERT_P(?, ?, ?, ?, ?)}");
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

  public static void bubbleSort(int[] arr) {
    int len = arr.length;
    for (int i = 0; i < len; i++) {
      for (int j = 1; j < len - i; j++) {
        if (arr[j - 1] > arr[j]) {
          int tmp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = tmp;
        }
      }
    }
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

  @GetMapping("/doctors/{doctor_id}")
  public ArrayList<Doctor> readDoctor(@PathVariable int doctor_id) {
    ArrayList<Doctor> doctors = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM SPRING.DOCTOR WHERE DOCTOR_ID = ?");
      ps.setInt(1, doctor_id);
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

  @DeleteMapping("/doctors/{doctor_id}")
  public void deleteDoctor(@PathVariable int doctor_id) {
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL SPRING.DOCTOR_DELETE_P(?)}");
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
