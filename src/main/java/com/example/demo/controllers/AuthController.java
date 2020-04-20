package com.example.demo.controllers;


import com.example.demo.models.Doctor;
import com.example.demo.models.Patient;
import com.example.demo.models.Users;
import com.example.demo.utils.DataBase;
import com.google.gson.JsonObject;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/v1")
public class AuthController {
  @Autowired
  HikariDataSource hds;

//  @GetMapping(path = "/auth")
//  public Users auth() {
//    return new Users();
//  }

  @GetMapping("/auth")
  public ArrayList readUsers() {
    ArrayList<Users> users = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM SPRING.USERS");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        Users u = new Users();
        u.setUser_id(rs.getInt("user_id"));
        u.setUser_role(rs.getInt("user_role"));
        u.setLogin(rs.getString("login"));
        u.setPassword(rs.getString("password"));
        u.setFirst_name(rs.getString("first_name"));
        u.setLast_name(rs.getString("last_name"));
        u.setFather_name(rs.getString("father_name"));
        u.setBirth_date(rs.getString("birth_date"));
        u.setPhone_number(rs.getString("phone_number"));
        u.setPassport_number(rs.getString("passport_number"));
        u.setProfession(rs.getString("profession"));
        u.setAddress(rs.getString("address"));
        users.add(u);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return users;
  }

//  @PostMapping("/auth")
//  @ResponseBody
//  public String auth(@RequestBody Users user) {
//    ArrayList<Users> users = new ArrayList<>();
//    JsonObject json = new JsonObject();
//    Connection conn = null;
//    PreparedStatement ps = null;
//    ResultSet rs = null;
//    try {
//      json.addProperty("success", false);
//      String login = user.getLogin();
//      String password = user.getPassword();
//      conn = hds.getConnection();
//      ps = conn.prepareStatement("SELECT * FROM SPRING.USERS WHERE LOGIN = ? AND PASSWORD = ?");
//      ps.setString(1, login);
//      ps.setString(2, password);
//      ps.execute();
//      rs = ps.getResultSet();
//      while (rs.next()) {
//        Users u = new Users();
//        u.setUser_id(rs.getInt("user_id"));
//        u.setUser_role(rs.getInt("user_role"));
//        u.setLogin(rs.getString("login"));
//        u.setPassword(rs.getString("password"));
//        u.setFirst_name(rs.getString("first_name"));
//        u.setLast_name(rs.getString("last_name"));
//        u.setFather_name(rs.getString("father_name"));
//        u.setBirth_date(rs.getString("birth_date"));
//        u.setPhone_number(rs.getString("phone_number"));
//        u.setPassport_number(rs.getString("passport_number"));
//        u.setProfession(rs.getString("profession"));
//        u.setAddress(rs.getString("address"));
//        users.add(u);
//        json.addProperty("success", true);
//      }
//      if (!rs.next()) {
//        json.addProperty("msg", "Login or Password is incorrect");
//      }
//    } catch (Exception e) {
//      e.printStackTrace();
//    } finally {
//      DataBase.close(rs);
//      DataBase.close(ps);
//      DataBase.close(conn);
//    }
//    return json.toString();
//  }
}
