package com.example.demo.services;

import com.example.demo.utils.DataBase;
import com.zaxxer.hikari.HikariDataSource;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Service
public class AdminService {

  @Autowired HikariDataSource hds;

  public String readDoctors() {
    Connection conn = null;
    JSONArray response = new JSONArray();
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("Select * From doctor Order By doctor_id");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        JSONObject obj = new JSONObject();
        obj.put("doctor_id", rs.getInt("doctor_id"));
        obj.put("first_name", rs.getString("first_name"));
        obj.put("last_name", rs.getString("last_name"));
        obj.put("passport_number", rs.getString("passport_number"));
        obj.put("profession", rs.getString("profession"));
        obj.put("address", rs.getString("address"));
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

  public String addDoctor(JSONObject params) throws JSONException {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call doctor_pkg.doctor_add_p(?, ?, ?, ?, ?)}");
      cs.setString(1, params.getString("first_name"));
      cs.setString(2, params.getString("last_name"));
      cs.setString(3, params.getString("passport_number"));
      cs.setString(4, params.getString("profession"));
      cs.setString(5, params.getString("address"));
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

  public String addPatient(JSONObject params) throws JSONException {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call patient_add_p(?, ?, ?, ?, ?, ?)}");
      cs.setString(1, params.getString("first_name"));
      cs.setString(2, params.getString("last_name"));
      cs.setString(3, params.getString("father_name"));
      cs.setString(4, params.getString("address"));
      cs.setString(5, params.getString("birth_date"));
      cs.setString(6, params.getString("phone_number"));
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

  public String readPatients() {
    Connection conn = null;
    JSONArray response = new JSONArray();
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("Select * From patient Order By patient_id");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        JSONObject obj = new JSONObject();
        obj.put("patient_id", rs.getInt("patient_id"));
        obj.put("first_name", rs.getString("first_name"));
        obj.put("last_name", rs.getString("last_name"));
        obj.put("father_name", rs.getString("father_name"));
        obj.put("address", rs.getString("address"));
        obj.put("birth_date", rs.getString("birth_date"));
        obj.put("phone_number", rs.getString("phone_number"));
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

  public String updateDoctor(JSONObject params, int doctor_id) {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call doctor_pkg.doctor_update_p(?, ?, ?, ?, ?, ?)}");
      cs.setInt(1, doctor_id);
      cs.setString(2, params.getString("first_name"));
      cs.setString(3, params.getString("last_name"));
      cs.setString(4, params.getString("passport_number"));
      cs.setString(5, params.getString("profession"));
      cs.setString(6, params.getString("address"));
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

  public String updatePatient(JSONObject params, int patient_id) {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call patient_update_p(?, ?, ?, ?, ?, ?, ?)}");
      cs.setInt(1, patient_id);
      cs.setString(2, params.getString("first_name"));
      cs.setString(3, params.getString("last_name"));
      cs.setString(4, params.getString("father_name"));
      cs.setString(5, params.getString("address"));
      cs.setString(6, params.getString("birth_date"));
      cs.setString(7, params.getString("phone_number"));
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

  public String deleteDoctor(int doctor_id) {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call doctor_pkg.doctor_delete_p(?)}");
      cs.setInt(1, doctor_id);
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

  public String deletePatient(int patient_id) {
    JSONObject response = new JSONObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{call patient_delete_p(?)}");
      cs.setInt(1, patient_id);
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
}







