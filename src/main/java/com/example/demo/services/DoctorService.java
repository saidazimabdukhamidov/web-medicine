package com.example.demo.services;

import com.example.demo.utils.DataBase;
import com.zaxxer.hikari.HikariDataSource;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Service
public class DoctorService {

  @Autowired HikariDataSource hds;

  public String addMedHistory(JSONObject params) {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call Doctor_Pkg.Add_medical_history_p(?, ?, ?, ?)}");
      cs.setInt(1, params.getInt("patient_id"));
      cs.setString(2, params.getString("history"));
      cs.setString(3, params.getString("created_by"));
      cs.setString(4, params.getString("created_time"));
      cs.executeUpdate();
      response.put("success", true);
    } catch (Exception e) {
      e.printStackTrace();
      response.put("success", false);
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return response.toString();
  }

  public String readPatient(int patient_id) {
    Connection conn = null;
    JSONArray response = new JSONArray();
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("Select * From medical_history Where patient_id = ?");
      ps.setInt(1, patient_id);
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        JSONObject obj = new JSONObject();
        obj.put("patient_id", rs.getInt("patient_id"));
        obj.put("first_name", rs.getString("first_name"));
        obj.put("last_name", rs.getString("last_name"));
        obj.put("history", rs.getString("history"));
        obj.put("created_time", rs.getString("created_time"));
        obj.put("created_by", rs.getString("created_by"));
        response.put(obj);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return response.toString();
  }

  public String readHistories() {
    Connection conn = null;
    JSONArray response = new JSONArray();
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("Select * From medical_history");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        JSONObject obj = new JSONObject();
        obj.put("patient_id", rs.getInt("patient_id"));
        obj.put("first_name", rs.getString("first_name"));
        obj.put("last_name", rs.getString("last_name"));
        obj.put("history", rs.getString("history"));
        obj.put("created_time", rs.getString("created_time"));
        obj.put("created_by", rs.getString("created_by"));
        response.put(obj);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return response.toString();
  }
}
