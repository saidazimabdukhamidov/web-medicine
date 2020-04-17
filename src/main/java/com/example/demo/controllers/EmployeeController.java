package com.example.demo.controllers;

import com.example.demo.models.Employee;
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
public class EmployeeController {
  @Autowired
  HikariDataSource hds;

  @PostMapping("/employees")
  @ResponseBody
  public String createEmployee(@RequestBody Employee employee) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      String firstName = employee.getFirstName();
      String lastName = employee.getLastName();
      String emailId = employee.getEmailId();
      int salary = employee.getSalary();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL NERS.EMPLOYEE_INSERT_P(?, ?, ?, ?)}");
      cs.setString(1, firstName);
      cs.setString(2, lastName);
      cs.setString(3, emailId);
      cs.setInt(4, salary);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @GetMapping("/employees")
  public ArrayList readEmployee() {
    ArrayList<Employee> employees = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM NERS.EMPLOYEE");
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        Employee e = new Employee();
        e.setEmployeeId(rs.getInt("employee_id"));
        e.setFirstName(rs.getString("first_name"));
        e.setLastName(rs.getString("last_name"));
        e.setEmailId(rs.getString("email_id"));
        e.setSalary(rs.getInt("salary"));
        employees.add(e);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return employees;
  }

  @GetMapping("/employees/{employeeId}")
  public ArrayList<Employee> editEmployee(@PathVariable int employeeId) {
    ArrayList<Employee> employees = new ArrayList<>();
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      conn = hds.getConnection();
      ps = conn.prepareStatement("SELECT * FROM NERS.EMPLOYEE WHERE EMPLOYEE_ID = ?");
      ps.setInt(1, employeeId);
      ps.execute();
      rs = ps.getResultSet();
      while (rs.next()) {
        Employee e = new Employee();
        e.setEmployeeId(rs.getInt("employee_id"));
        e.setFirstName(rs.getString("first_name"));
        e.setLastName(rs.getString("last_name"));
        e.setEmailId(rs.getString("email_id"));
        e.setSalary(rs.getInt("salary"));
        employees.add(e);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(rs);
      DataBase.close(ps);
      DataBase.close(conn);
    }
    return employees;
  }

  @PutMapping("/employees/{employeeId}")
  @ResponseBody
  public String updateEmployee(@RequestBody Employee employee, @PathVariable int employeeId) {
    JsonObject json = new JsonObject();
    Connection conn = null;
    CallableStatement cs = null;
    try {
      String firstName = employee.getFirstName();
      String lastName = employee.getLastName();
      String emailId = employee.getEmailId();
      int salary = employee.getSalary();
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL NERS.EMPLOYEE_UPDATE_P(?, ?, ?, ?, ?)}");
      cs.setInt(1, employeeId);
      cs.setString(2, firstName);
      cs.setString(3, lastName);
      cs.setString(4, emailId);
      cs.setInt(5, salary);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
    return json.toString();
  }

  @DeleteMapping("/employees/{employeeId}")
  public void archiveEmployee(@PathVariable int employeeId) {
    Connection conn = null;
    CallableStatement cs = null;
    try {
      conn = hds.getConnection();
      cs = conn.prepareCall("{CALL NERS.EMPLOYEE_ARCHIVE_P(?)}");
      cs.setInt(1, employeeId);
      cs.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      DataBase.close(cs);
      DataBase.close(conn);
    }
  }
}
