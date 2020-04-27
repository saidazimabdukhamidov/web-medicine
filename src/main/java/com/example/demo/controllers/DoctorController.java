package com.example.demo.controllers;

import com.example.demo.models.MedicalHistory;
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
public class DoctorController {
  @Autowired
  HikariDataSource hds;

  @PostMapping("/histories")
  @ResponseBody
  public String addMedHistory(@RequestBody MedicalHistory history) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      int patientId = history.getPatient_id();
      String medHistory = history.getHistory();
      String createdTime = history.getCreated_time();
      String createdBy = history.getCreated_by();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL DOCTOR_PKG.MEDICAL_HISTORY_ADD_P(?, ?, ?, ?)}");
      cs.setInt(1, patientId);
      cs.setString(2, medHistory);
      cs.setString(3, createdBy);
      cs.setString(4, createdTime);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @GetMapping("/patients/{patient_id}")
  public ArrayList readPatient(@PathVariable int patient_id) {
    ArrayList<MedicalHistory> history = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM SPRING.MEDICAL_HISTORY WHERE PATIENT_ID = ?");
      ps.setInt(1, patient_id);
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        MedicalHistory h = new MedicalHistory();
        h.setPatient_id(rs.getInt("patient_id"));
        h.setFull_name(rs.getString("full_name"));
        h.setHistory(rs.getString("history"));
        h.setCreated_time(rs.getString("created_time"));
        h.setCreated_by(rs.getString("created_by"));
        history.add(h);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return history;
  }

  @GetMapping("/histories")
  public ArrayList readMedHistory() {
    ArrayList<MedicalHistory> history = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM SPRING.MEDICAL_HISTORY");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        MedicalHistory h = new MedicalHistory();
        h.setPatient_id(rs.getInt("patient_id"));
        h.setFull_name(rs.getString("full_name"));
        h.setHistory(rs.getString("history"));
        h.setCreated_time(rs.getString("created_time"));
        h.setCreated_by(rs.getString("created_by"));
        history.add(h);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return history;
  }
}
