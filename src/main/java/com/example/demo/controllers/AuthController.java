//package com.example.demo.controllers;
//
//import com.example.demo.models.Role;
//import com.example.demo.session.Session;
//import com.example.demo.utils.DataBase;
//import com.google.gson.JsonObject;
//import com.zaxxer.hikari.HikariDataSource;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpServletRequest;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.util.ArrayList;
//
//@CrossOrigin(origins = "http://localhost:4200")
//
//@RestController
//@RequestMapping("/api/v1")
//public class AuthController {
//  @Autowired
//  HikariDataSource hds;
//
//  @Autowired
//  HttpServletRequest request;
//
//  @Autowired
//  Session session;
//
//  @GetMapping("/auth")
//  public String login() {
//    return "login";
//  }
//
//
//  @PostMapping("/auth")
//  @ResponseBody
//  public String auth() {
//    ArrayList<Role> roles = new ArrayList<>();
//    ArrayList<Role> Role = new ArrayList<>();
//    JsonObject res = new JsonObject();
//    Connection conn = null;
//    PreparedStatement ps = null;
//    ResultSet rs = null;
//    try {
//      res.addProperty("success", false);
//      String username = request.getParameter("user_name");
//      String password = request.getParameter("user_password");
//      conn = hds.getConnection();
//      ps = conn.prepareStatement("");
//      ps.setString(1, username);
//      ps.setString(2, password);
//      ps.setString(3, username);
//      ps.setString(4, password);
//      ps.execute();
//      rs = ps.getResultSet();
//      while (rs.next()) {
//        Role r = new Role();
//        r.setRole_name(rs.getString("role_name"));
//        r.setRole_id(rs.getInt("role_id"));
//        roles.add(r);
//        session.setRole_name(Role);
//        session.setRole_id(rs.getInt("role_id"));
//        session.setUser_id(rs.getInt("user_id"));
//        session.setUser_name(rs.getString("user_name"));
//        session.set();
//        res.addProperty("success", true);
//      }
//      if (!rs.next()) {
//        res.addProperty("msg", "Username or password is incorrect!");
//      }
//    } catch (Exception e) {
//      e.printStackTrace();
//    } finally {
//      DataBase.close(rs);
//      DataBase.close(ps);
//      DataBase.close(conn);
//    }
//
//    return res.toString();
//  }
//}
