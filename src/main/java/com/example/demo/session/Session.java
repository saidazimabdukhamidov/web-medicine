//package com.example.demo.session;
//
//import com.example.demo.models.Role;
//import lombok.Data;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.annotation.SessionScope;
//import org.springframework.web.util.WebUtils;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.ArrayList;
//
//@Component
//@SessionScope
//@Data
//public class Session {
//  @Autowired
//  HttpServletRequest request;
//
//  private Integer user_id;
//  private String user_name;
//  private ArrayList<Role> role;
//  private ArrayList<Role> role_name;
//  private Integer role_id;
//
//  public Session get(HttpServletRequest request) {
//    return (Session) WebUtils.getSessionAttribute(request, "ENV");
//  }
//
//  public void set() {
//    WebUtils.setSessionAttribute(request, "ENV", this);
//  }
//
//  public void remove() {
//    request.getSession().invalidate();
//  }
//}
